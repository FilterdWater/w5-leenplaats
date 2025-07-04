<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RentalController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'advertisement_id' => 'required|exists:advertisements,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $advertisement = \App\Models\Advertisement::findOrFail($request->advertisement_id);

        // Check for availability (simple check, can be expanded)
        // This assumes an advertisement can only be rented by one person at a time
        $existingRental = \App\Models\Rental::where('advertisement_id', $advertisement->id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                      ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                      ->orWhere(function ($query) use ($request) {
                          $query->where('start_date', '<=', $request->start_date)
                                ->where('end_date', '>=', $request->end_date);
                      });
            })
            ->whereIn('status', ['pending', 'confirmed'])
            ->first();

        if ($existingRental) {
            return response()->json(['message' => 'Advertisement is not available for the selected dates.'], 409);
        }

        $rental = new \App\Models\Rental();
        $rental->advertisement_id = $request->advertisement_id;
        $rental->user_id = auth()->id(); // Assuming authenticated user
        $rental->start_date = $request->start_date;
        $rental->end_date = $request->end_date;
        $rental->status = 'pending'; // Initial status
        $rental->save();

        return response()->json(['message' => 'Rental request submitted successfully.', 'rental' => $rental], 201);
    }
}

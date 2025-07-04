<?php

namespace Database\Seeders;

use App\Models\Advertisement;
use App\Models\Category;
use App\Models\Picture;
use App\Models\Rental;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdvertisementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!function_exists('imagecreatetruecolor')) {
            echo "GD library is not enabled. Cannot generate placeholder images.\n";
            return;
        }

        $categories = ['Electronics', 'Vehicles', 'Home Appliances', 'Books', 'Sports Equipment', 'Clothing', 'Tools', 'Furniture'];

        foreach ($categories as $categoryName) {
            Category::firstOrCreate(['name' => $categoryName]);
        }

        $users = User::all();
        $categories = Category::all();

        $base64Images = [];
        for ($i = 0; $i < 4; $i++) {
            $base64Images[] = $this->generatePlaceholderImage();
        }

        Advertisement::factory(50)->make()->each(function ($advertisement) use ($users, $categories, $base64Images) {
            $advertisement->user_id = $users->random()->id;
            $advertisement->save();
            $advertisement->categories()->attach($categories->random(rand(1, 3))->pluck('id'));

            // Attach 1 to 4 random base64 images
            $numPictures = rand(1, 4);
            $picturesToAttach = [];
            for ($i = 0; $i < $numPictures; $i++) {
                $picture = Picture::create([
                    'picture_base_string' => $base64Images[array_rand($base64Images)],
                ]);
                $picturesToAttach[] = $picture->id;
            }
            $advertisement->pictures()->attach($picturesToAttach);

            // Create some rentals for the advertisement
            if (rand(0, 1)) { // 50% chance to have a rental
                $renter = $users->except($advertisement->user_id)->random();
                $startDate = now()->addDays(rand(-10, 10));
                $endDate = $startDate->addDays(rand(1, 10));

                Rental::create([
                    'advertisement_id' => $advertisement->id,
                    'user_id' => $renter->id,
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                    'status' => rand(0, 1) ? 'confirmed' : 'pending',
                ]);
            }
        });
    }

    private function generatePlaceholderImage(): string
    {
        $width = 100;
        $height = 100;
        $image = imagecreatetruecolor($width, $height);

        // Generate random color
        $red = rand(0, 255);
        $green = rand(0, 255);
        $blue = rand(0, 255);
        $color = imagecolorallocate($image, $red, $green, $blue);

        imagefill($image, 0, 0, $color);

        ob_start();
        imagepng($image);
        $imageData = ob_get_clean();
        imagedestroy($image);

        return 'data:image/png;base64,' . base64_encode($imageData);
    }
}

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/js/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/js/components/ui/dialog";
import { Input } from "@/js/components/ui/input";
import { AdvertisementCard } from "@/js/widgets/advertisement-card";
import { fetchAdvertisements } from "@/js/services/advertisementService";
import { type Advertisement } from "@/js/models/advertisement";

export function SearchAdvertisements() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [filteredAdvertisements, setFilteredAdvertisements] = useState<
    Advertisement[]
  >([]);

  useEffect(() => {
    const getAdvertisements = async () => {
      try {
        const data = await fetchAdvertisements();
        setAdvertisements(data);
      } catch (error) {
        console.error("Failed to fetch advertisements:", error);
      }
    };

    getAdvertisements();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredAdvertisements(advertisements);
    } else {
      setFilteredAdvertisements(
        advertisements.filter((ad) =>
          ad.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, advertisements]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="h-9 w-9">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col gap-4 py-4">
          <Input
            type="text"
            placeholder="Search advertisements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="col-span-3"
          />
          <div className="max-h-[35rem] overflow-y-auto">
            <div className="grid gap-4">
              {filteredAdvertisements.length > 0 ? (
                filteredAdvertisements.map((ad) => (
                  <AdvertisementCard
                    key={ad.id}
                    advertisement={ad}
                    user={ad.user}
                  />
                ))
              ) : (
                <p className="text-center text-neutral-500">
                  No advertisements found.
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

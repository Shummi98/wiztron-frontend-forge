import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
}

const AdminGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState({
    image_url: "",
    caption: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("uploaded_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setItems(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("gallery").insert([form]);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Image added to gallery!" });
      setForm({ image_url: "", caption: "" });
      fetchItems();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("gallery").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Image deleted successfully!" });
      fetchItems();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
              />
            </div>
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" /> Add Image
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <img src={item.image_url} alt={item.caption || ""} className="w-full h-48 object-cover rounded mb-2" />
              {item.caption && <p className="text-sm mb-2">{item.caption}</p>}
              <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} className="w-full">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;

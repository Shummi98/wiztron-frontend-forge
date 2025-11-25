import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image_url: string | null;
  is_past: boolean;
}

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    image_url: "",
    is_past: false
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setEvents(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("events")
        .update(form)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Event updated successfully!" });
        resetForm();
        fetchEvents();
      }
    } else {
      const { error } = await supabase.from("events").insert([form]);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Event created successfully!" });
        resetForm();
        fetchEvents();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Event deleted successfully!" });
      fetchEvents();
    }
  };

  const handleEdit = (event: Event) => {
    setForm({
      title: event.title,
      date: event.date,
      time: event.time,
      venue: event.venue,
      description: event.description || "",
      image_url: event.image_url || "",
      is_past: event.is_past
    });
    setEditingId(event.id);
  };

  const resetForm = () => {
    setForm({
      title: "",
      date: "",
      time: "",
      venue: "",
      description: "",
      image_url: "",
      is_past: false
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Event" : "Add New Event"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_past"
                checked={form.is_past}
                onChange={(e) => setForm({ ...form, is_past: e.target.checked })}
              />
              <Label htmlFor="is_past">Mark as past event</Label>
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? "Update" : <><Plus className="h-4 w-4 mr-2" /> Create</>}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <h3 className="font-bold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {event.date} at {event.time} - {event.venue}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleEdit(event)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;

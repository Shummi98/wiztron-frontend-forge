import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  linkedin_url: string | null;
  image_url: string | null;
  category: string;
  display_order: number;
}

const AdminTeam = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [form, setForm] = useState<{
    name: string;
    role: string;
    linkedin_url: string;
    image_url: string;
    category: "president" | "vice_president" | "technical" | "event_management" | "media_design";
    display_order: number;
  }>({
    name: "",
    role: "",
    linkedin_url: "",
    image_url: "",
    category: "technical",
    display_order: 0
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setMembers(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("team_members")
        .update(form)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Team member updated successfully!" });
        resetForm();
        fetchMembers();
      }
    } else {
      const { error } = await supabase.from("team_members").insert([form]);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Team member added successfully!" });
        resetForm();
        fetchMembers();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("team_members").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Team member deleted successfully!" });
      fetchMembers();
    }
  };

  const handleEdit = (member: TeamMember) => {
    setForm({
      name: member.name,
      role: member.role,
      linkedin_url: member.linkedin_url || "",
      image_url: member.image_url || "",
      category: member.category as "president" | "vice_president" | "technical" | "event_management" | "media_design",
      display_order: member.display_order
    });
    setEditingId(member.id);
  };

  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      linkedin_url: "",
      image_url: "",
      category: "technical",
      display_order: 0
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Team Member" : "Add New Team Member"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value as "president" | "vice_president" | "technical" | "event_management" | "media_design" })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="president">President</SelectItem>
                  <SelectItem value="vice_president">Vice President</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="event_management">Event Management</SelectItem>
                  <SelectItem value="media_design">Media & Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input
                id="linkedin_url"
                value={form.linkedin_url}
                onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
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
            <div>
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) })}
              />
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
        {members.map((member) => (
          <Card key={member.id}>
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role} - {member.category}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleEdit(member)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}>
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

export default AdminTeam;

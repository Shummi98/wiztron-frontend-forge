import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  github_link: string | null;
  leader_name: string;
  image_url: string | null;
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    github_link: "",
    leader_name: "",
    image_url: ""
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setProjects(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("projects")
        .update(form)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Project updated successfully!" });
        resetForm();
        fetchProjects();
      }
    } else {
      const { error } = await supabase.from("projects").insert([form]);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Project created successfully!" });
        resetForm();
        fetchProjects();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Project deleted successfully!" });
      fetchProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      github_link: project.github_link || "",
      leader_name: project.leader_name,
      image_url: project.image_url || ""
    });
    setEditingId(project.id);
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      github_link: "",
      leader_name: "",
      image_url: ""
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Project" : "Add New Project"}</CardTitle>
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
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="leader_name">Project Leader</Label>
              <Input
                id="leader_name"
                value={form.leader_name}
                onChange={(e) => setForm({ ...form, leader_name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="github_link">GitHub Link</Label>
              <Input
                id="github_link"
                value={form.github_link}
                onChange={(e) => setForm({ ...form, github_link: e.target.value })}
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
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">Lead by {project.leader_name}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleEdit(project)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
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

export default AdminProjects;

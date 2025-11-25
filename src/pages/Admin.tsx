import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AdminEvents from "@/components/admin/AdminEvents";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminTeam from "@/components/admin/AdminTeam";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminMemberships from "@/components/admin/AdminMemberships";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);

    const { data } = await supabase.rpc('has_role', {
      _user_id: session.user.id,
      _role: 'admin'
    });

    setIsAdmin(!!data);
    setLoading(false);

    if (!data) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive"
      });
      navigate("/");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Wiztron Admin Panel</h1>
          <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="memberships">Memberships</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <AdminEvents />
          </TabsContent>

          <TabsContent value="projects">
            <AdminProjects />
          </TabsContent>

          <TabsContent value="team">
            <AdminTeam />
          </TabsContent>

          <TabsContent value="gallery">
            <AdminGallery />
          </TabsContent>

          <TabsContent value="memberships">
            <AdminMemberships />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

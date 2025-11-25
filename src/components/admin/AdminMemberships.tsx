import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Membership {
  id: string;
  name: string;
  email: string;
  branch: string;
  year: string;
  joined_on: string;
}

const AdminMemberships = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    const { data, error } = await supabase
      .from("memberships")
      .select("*")
      .order("joined_on", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setMemberships(data || []);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Membership Submissions ({memberships.length})</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Joined On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberships.map((membership) => (
                <TableRow key={membership.id}>
                  <TableCell>{membership.name}</TableCell>
                  <TableCell>{membership.email}</TableCell>
                  <TableCell>{membership.branch}</TableCell>
                  <TableCell>{membership.year}</TableCell>
                  <TableCell>{new Date(membership.joined_on).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMemberships;

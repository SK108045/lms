import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, ExternalLink, BookOpen } from "lucide-react";

async function getCertificates(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("certificates")
    .select(`
      *,
      course:courses(id, title, slug, thumbnail_url, duration_hours,
        instructor:profiles!courses_instructor_id_fkey(full_name)
      )
    `)
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });
  return data || [];
}

export default async function CertificatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/certificates");

  const certificates = await getCertificates(user.id);
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Certificates</h1>
          <p className="mt-2 text-muted-foreground">
            Your earned certificates of completion
          </p>
        </div>

        {certificates.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
            <Award className="mb-4 size-16 text-muted-foreground/50" />
            <h2 className="text-xl font-semibold">No certificates yet</h2>
            <p className="mt-2 text-muted-foreground">
              Complete a course to earn your first certificate
            </p>
            <Link href="/courses" className="mt-6">
              <Button>
                <BookOpen className="mr-2 size-4" />
                Browse Courses
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert: any) => (
              <Card
                key={cert.id}
                className="group overflow-hidden transition-all hover:shadow-lg"
              >
                {/* Certificate Visual */}
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/20">
                  <div className="text-center">
                    <Award className="mx-auto mb-2 size-12 text-primary" />
                    <div className="text-xs font-medium text-primary/70">
                      CERTIFICATE OF COMPLETION
                    </div>
                  </div>
                  <div className="absolute inset-0 border-8 border-primary/5 m-2 rounded" />
                </div>

                <CardContent className="flex flex-col gap-3 p-4">
                  <div>
                    <h3 className="font-semibold leading-tight">
                      {cert.course?.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {cert.course?.instructor?.full_name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <Badge variant="secondary" className="font-mono text-xs">
                      {cert.certificate_number}
                    </Badge>
                    <span>
                      {new Date(cert.issued_at).toLocaleDateString("en-KE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/my-learning/${cert.course?.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <ExternalLink className="size-3" />
                        View Course
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="flex-1 gap-1"
                      onClick={() => window.print()}
                    >
                      <Download className="size-3" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

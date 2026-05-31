import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, Users, Star } from "lucide-react";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  showInstructor?: boolean;
}

export function CourseCard({ course, showInstructor = true }: CourseCardProps) {
  const priceDisplay = course.isFree ? "Free" : `KES ${Number(course.price).toLocaleString()}`;
  
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {course.thumbnailUrl ? (
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
              <span className="text-4xl font-bold text-primary/30">
                {course.title.charAt(0)}
              </span>
            </div>
          )}
          {course.isFree && (
            <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
              Free
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          {course.category && (
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-primary">
              {course.category.name}
            </p>
          )}
          <h3 className="mb-2 line-clamp-2 font-semibold leading-tight group-hover:text-primary">
            {course.title}
          </h3>
          {course.shortDescription && (
            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
              {course.shortDescription}
            </p>
          )}
          {showInstructor && course.instructor && (
            <p className="text-sm text-muted-foreground">
              By {course.instructor.fullName || "Instructor"}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t border-border p-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {course.durationHours && (
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {course.durationHours}h
              </span>
            )}
            {course.enrollmentCount !== undefined && (
              <span className="flex items-center gap-1">
                <Users className="size-3" />
                {course.enrollmentCount}
              </span>
            )}
          </div>
          <p className="font-semibold text-primary">{priceDisplay}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function CourseCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <div className="aspect-video animate-pulse bg-muted" />
      <CardContent className="p-4">
        <div className="mb-2 h-3 w-20 animate-pulse rounded bg-muted" />
        <div className="mb-2 h-5 w-full animate-pulse rounded bg-muted" />
        <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border p-4">
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        <div className="h-5 w-16 animate-pulse rounded bg-muted" />
      </CardFooter>
    </Card>
  );
}

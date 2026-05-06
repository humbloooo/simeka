export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    id: "general-manager",
    name: "Portia Tshabalala",
    role: "General Manager",
    bio: "Portia leads operations at Simeka Heights, ensuring every resident enjoys a safe, comfortable, and supportive environment that empowers academic success. With a hands-on approach to student welfare, she's the first point of contact for residents and parents alike.",
    image: "/images/team_portia.png",
  },
];

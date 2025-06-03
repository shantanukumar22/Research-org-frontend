import React, { useState } from "react";
import { Search, Filter, Briefcase, Award, BookOpen, Mail } from "lucide-react";

export default function Team() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Sample team data - replace with your actual team information
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Jane Smith",
      role: "Executive Director",
      department: "Leadership",
      image: "/img/team/jane-smith.jpg", // Replace with actual image path
      bio: "Ph.D. in Computational Biology with over 20 years of research experience in genomics and bioinformatics. Dr. Smith has led numerous groundbreaking studies on genetic markers for early disease detection.",
      expertise: ["Genomics", "Research Leadership", "Computational Biology"],
      publications: 45,
      email: "j.smith@researchorg.com",
    },
    {
      id: 2,
      name: "Dr. Michael Johnson",
      role: "Research Director",
      department: "Leadership",
      image: "/img/team/michael-johnson.jpg",
      bio: "Leading our efforts in quantum computing research with breakthrough publications in top journals. Previously worked at CERN and MIT on particle physics applications.",
      expertise: ["Quantum Computing", "Particle Physics", "Data Analysis"],
      publications: 38,
      email: "m.johnson@researchorg.com",
    },
    {
      id: 3,
      name: "Dr. Sarah Williams",
      role: "Head of Innovation",
      department: "Leadership",
      image: "/img/team/sarah-williams.jpg",
      bio: "Specializes in translating research findings into practical applications and policy recommendations. Has secured over $12M in research grants in the past five years.",
      expertise: [
        "Research Translation",
        "Policy Development",
        "Grant Writing",
      ],
      publications: 27,
      email: "s.williams@researchorg.com",
    },
    {
      id: 4,
      name: "Dr. Robert Chen",
      role: "Senior Researcher",
      department: "Environmental Science",
      image: "/img/team/robert-chen.jpg",
      bio: "Expert in climate modeling and environmental impact assessment with a focus on coastal regions. Has conducted field research across four continents.",
      expertise: [
        "Climate Modeling",
        "Coastal Ecology",
        "Environmental Impact Assessment",
      ],
      publications: 32,
      email: "r.chen@researchorg.com",
    },
    {
      id: 5,
      name: "Dr. Aisha Patel",
      role: "Lead Data Scientist",
      department: "Data Science",
      image: "/img/team/aisha-patel.jpg",
      bio: "Combines expertise in machine learning and statistical analysis to extract meaningful insights from complex datasets. Previously worked at Google Research.",
      expertise: [
        "Machine Learning",
        "Big Data Analytics",
        "Statistical Modeling",
      ],
      publications: 29,
      email: "a.patel@researchorg.com",
    },
    {
      id: 6,
      name: "Dr. James Wilson",
      role: "Research Fellow",
      department: "Social Sciences",
      image: "/img/team/james-wilson.jpg",
      bio: "Investigates the societal impacts of technological change with a focus on digital equity and inclusion. Leads our community engagement initiatives.",
      expertise: [
        "Technology Ethics",
        "Digital Inclusion",
        "Community-Based Research",
      ],
      publications: 18,
      email: "j.wilson@researchorg.com",
    },
    {
      id: 7,
      name: "Dr. Elena Rodriguez",
      role: "Senior Researcher",
      department: "Health Sciences",
      image: "/img/team/elena-rodriguez.jpg",
      bio: "Focuses on public health interventions and epidemiological modeling. Has led several major studies on disease prevention strategies.",
      expertise: ["Epidemiology", "Public Health", "Intervention Design"],
      publications: 36,
      email: "e.rodriguez@researchorg.com",
    },
    {
      id: 8,
      name: "Dr. David Kim",
      role: "Research Scientist",
      department: "Technology",
      image: "/img/team/david-kim.jpg",
      bio: "Develops novel computational approaches for solving complex problems in artificial intelligence and robotics. Previously worked at NASA JPL.",
      expertise: ["AI", "Robotics", "Computational Methods"],
      publications: 24,
      email: "d.kim@researchorg.com",
    },
    {
      id: 9,
      name: "Dr. Olivia Thompson",
      role: "Postdoctoral Researcher",
      department: "Environmental Science",
      image: "/img/team/olivia-thompson.jpg",
      bio: "Recent Ph.D. graduate studying the impacts of microplastics on marine ecosystems. Has developed new methods for microplastic detection in seawater.",
      expertise: ["Marine Biology", "Microplastics", "Water Quality"],
      publications: 8,
      email: "o.thompson@researchorg.com",
    },
  ];

  // Available departments for filtering
  const departments = [
    "All",
    "Leadership",
    "Environmental Science",
    "Data Science",
    "Social Sciences",
    "Health Sciences",
    "Technology",
  ];

  // Filter team members based on search term and active filter
  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "All" || member.department === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
          Our Research Team
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Meet the dedicated scientists and researchers driving innovation and
          discovery at our organization.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full md:w-auto flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">Filter by department:</span>
          <select
            className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leadership Team Highlight (for the "All" or "Leadership" filter) */}
      {(activeFilter === "All" || activeFilter === "Leadership") && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Leadership Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeamMembers
              .filter((member) => member.department === "Leadership")
              .map((leader) => (
                <div
                  key={leader.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-64 bg-gray-200">
                    {/* Replace with actual image */}
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                      {leader.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {leader.role}
                    </p>
                    <p className="text-gray-600 mb-4">{leader.bio}</p>

                    <div className="flex items-center gap-2 text-gray-500 mb-3">
                      <Mail className="h-4 w-4" />
                      <a
                        href={`mailto:${leader.email}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {leader.email}
                      </a>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {leader.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Rest of the team */}
      {activeFilter !== "Leadership" && (
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {activeFilter === "All" ? "Research Team" : `${activeFilter} Team`}
          </h2>

          {filteredTeamMembers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600">
                No team members found matching your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTeamMembers
                .filter((member) =>
                  activeFilter === "All"
                    ? member.department !== "Leadership"
                    : true
                )
                .map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-52 bg-gray-200">
                      {/* Replace with actual image */}
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold">{member.name}</h3>
                          <p className="text-blue-600">{member.role}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {member.department}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {member.bio}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.expertise.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-1 text-gray-500">
                          <BookOpen className="h-4 w-4" />
                          <span>{member.publications} publications</span>
                        </div>

                        <a
                          href={`/team/${member.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Stats Section */}
      <div className="mt-20 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Our Team by the Numbers
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {teamMembers.length}
            </div>
            <div className="text-gray-700">Researchers</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {departments.length - 1}
            </div>
            <div className="text-gray-700">Research Departments</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {teamMembers.reduce(
                (sum, member) => sum + member.publications,
                0
              )}
            </div>
            <div className="text-gray-700">Publications</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-700">Years of Excellence</div>
          </div>
        </div>
      </div>

      {/* Join Our Team CTA */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Join Our Research Team
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          We're always looking for talented researchers and scientists who are
          passionate about making a difference through innovative research.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/careers"
            className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Briefcase className="mr-2 h-5 w-5" />
            View Open Positions
          </a>
          <a
            href="/fellowships"
            className="inline-flex items-center px-5 py-2 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
          >
            <Award className="mr-2 h-5 w-5" />
            Fellowship Opportunities
          </a>
        </div>
      </div>
    </div>
  );
}

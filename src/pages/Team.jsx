import React, { useState } from "react";
import { Search, Filter, Briefcase, Award, BookOpen, Mail } from "lucide-react";

export default function Team() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Governing Board Members - Institute for Democracy and Sustainability
  const teamMembers = [
    {
      id: 1,
      name: "Mahesh Kumar Gaur",
      role: "Chairperson",
      department: "Leadership",
      image: "", // Will be added later
      bio: "Leading the Institute for Democracy and Sustainability with a vision for equity, equality, justice and non-violence in developmental processes.",
      expertise: ["Leadership & Governance", "Strategic Planning", "Policy Development"],
      email: "chairperson@ids.org",
    },
    {
      id: 2,
      name: "Rajendra Ravi",
      role: "Director",
      department: "Leadership",
      image: "", // Will be added later
      bio: "Overseeing the strategic direction and operations of the Institute, ensuring alignment with our mission of upholding the right to space of marginal and vulnerable urban dwellers.",
      expertise: ["Strategic Planning", "Operations Management", "Urban Development"],
      email: "director@ids.org",
    },
    {
      id: 3,
      name: "Geeta Ravikirti",
      role: "Treasurer",
      department: "Leadership",
      image: "", // Will be added later
      bio: "Managing the financial resources and ensuring transparent financial practices that support our democratic and sustainable development initiatives.",
      expertise: ["Financial Management", "Resource Planning", "Transparency"],
      email: "treasurer@ids.org",
    },
    {
      id: 4,
      name: "Mamta",
      role: "Board Member",
      department: "Governance",
      image: "", // Will be added later
      bio: "Contributing to the governance and decision-making processes of the Institute, bringing valuable insights to our mission.",
      expertise: ["Governance", "Community Engagement", "Policy Advocacy"],
      email: "mamta@ids.org",
    },
    {
      id: 5,
      name: "Tarun Kanti Bose",
      role: "Board Member",
      department: "Governance",
      image: "", // Will be added later
      bio: "Supporting the Institute's efforts in promoting democratic processes and sustainable development through active board participation.",
      expertise: ["Democratic Processes", "Sustainable Development", "Community Building"],
      email: "tarun@ids.org",
    },
    {
      id: 6,
      name: "Suraj Kumar",
      role: "Board Member",
      department: "Governance",
      image: "", // Will be added later
      bio: "Advocating for the rights of vulnerable urban dwellers and ensuring their inclusion in democratic processes through board governance.",
      expertise: ["Urban Rights", "Democratic Inclusion", "Social Justice"],
      email: "suraj@ids.org",
    },
    {
      id: 7,
      name: "Basant Kumar Hetamsaria",
      role: "Board Member",
      department: "Governance",
      image: "", // Will be added later
      bio: "Bringing expertise in sustainable development and democratic governance to support the Institute's mission and vision.",
      expertise: ["Sustainable Development", "Democratic Governance", "Environmental Justice"],
      email: "basant@ids.org",
    },
  ];

  // Available departments for filtering
  const departments = [
    "All",
    "Leadership",
    "Governance",
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
          Governing Board Members
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Meet the dedicated governing board members who guide the Institute for Democracy and Sustainability towards its mission of equity, equality, justice and non-violence.
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
            placeholder="Search board members..."
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
            Executive Leadership
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeamMembers
              .filter((member) => member.department === "Leadership")
              .map((leader) => (
                <div
                  key={leader.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200">
                    {leader.image ? (
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="text-6xl font-bold text-blue-600">
                          {leader.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {leader.role}
                    </p>
                    <p className="text-gray-600 mb-4">{leader.bio}</p>

                    {/* <div className="flex items-center gap-2 text-gray-500 mb-3">
                      <Mail className="h-4 w-4" />
                      <a
                        href={`mailto:${leader.email}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {leader.email}
                      </a>
                    </div> */}

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
            {activeFilter === "All" ? "Board Members" : `${activeFilter} Members`}
          </h2>

          {filteredTeamMembers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600">
                No board members found matching your search criteria.
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
                    <div className="h-52 bg-gradient-to-br from-blue-100 to-blue-200">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="text-4xl font-bold text-blue-600">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        </div>
                      )}
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

                      {/* <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Mail className="h-4 w-4" />
                          <a
                            href={`mailto:${member.email}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Contact
                          </a>
                        </div>

                        <a
                          href={`/team/${member.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Profile
                        </a>
                      </div> */}
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
          Our Governing Board by the Numbers
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {teamMembers.length}
            </div>
            <div className="text-gray-700">Board Members</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {departments.length - 1}
            </div>
            <div className="text-gray-700">Leadership Roles</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
            <div className="text-gray-700">Executive Positions</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
            <div className="text-gray-700">Years of Service</div>
          </div>
        </div>
      </div>

      {/* Join Our Mission CTA */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Join Our Mission for Democracy and Sustainability
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          We're always looking for partners who share our vision of equity, equality, 
          justice and non-violence in developmental processes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Us
          </a>
          <a
            href="/about"
            className="inline-flex items-center px-5 py-2 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
          >
            <Award className="mr-2 h-5 w-5" />
            Learn About Our Work
          </a>
        </div>
      </div>
    </div>
  );
}

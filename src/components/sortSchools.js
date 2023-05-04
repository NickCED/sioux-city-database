export const sortSchools = (schools) => {
  if (schools) {
    const highSchools = schools.filter((school) =>
      school.name.includes('High School')
    );
    const colleges = schools.filter((school) =>
      school.name.includes('College')
    );

    const sortByName = (a, b) => a.name.localeCompare(b.name);

    const sortedHighSchools = highSchools.sort(sortByName);
    const sortedColleges = colleges.sort(sortByName);

    return [sortedHighSchools, sortedColleges];
  }
};

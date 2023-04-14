/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSchool = /* GraphQL */ `
  query GetSchool($id: ID!) {
    getSchool(id: $id) {
      name
      logoUrl
      description
      sports {
        items {
          name
          description
          school
          sport
          startYear
          endYear
          notes
          id
          createdAt
          updatedAt
          schoolSportsId
        }
        nextToken
      }
      notes
      id
      createdAt
      updatedAt
    }
  }
`;
export const listSchools = /* GraphQL */ `
  query ListSchools(
    $filter: ModelSchoolFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchools(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        logoUrl
        description
        sports {
          nextToken
        }
        notes
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSchoolSport = /* GraphQL */ `
  query GetSchoolSport($id: ID!) {
    getSchoolSport(id: $id) {
      name
      description
      school
      sport
      startYear
      endYear
      wins {
        items {
          winTitle
          year
          description
          notes
          id
          createdAt
          updatedAt
          schoolSportWinsId
        }
        nextToken
      }
      images {
        items {
          name
          url
          id
          createdAt
          updatedAt
          schoolSportImagesId
          professionalSportImagesId
          professionalTeamImagesId
          hallOfFameImagesId
          venueImagesId
        }
        nextToken
      }
      notes
      id
      createdAt
      updatedAt
      schoolSportsId
    }
  }
`;
export const listSchoolSports = /* GraphQL */ `
  query ListSchoolSports(
    $filter: ModelSchoolSportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchoolSports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        description
        school
        sport
        startYear
        endYear
        wins {
          nextToken
        }
        images {
          nextToken
        }
        notes
        id
        createdAt
        updatedAt
        schoolSportsId
      }
      nextToken
    }
  }
`;
export const getProfessionalSport = /* GraphQL */ `
  query GetProfessionalSport($id: ID!) {
    getProfessionalSport(id: $id) {
      startYear
      endYear
      sportType
      description
      images {
        items {
          name
          url
          id
          createdAt
          updatedAt
          schoolSportImagesId
          professionalSportImagesId
          professionalTeamImagesId
          hallOfFameImagesId
          venueImagesId
        }
        nextToken
      }
      notes
      id
      createdAt
      updatedAt
    }
  }
`;
export const listProfessionalSports = /* GraphQL */ `
  query ListProfessionalSports(
    $filter: ModelProfessionalSportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfessionalSports(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        startYear
        endYear
        sportType
        description
        images {
          nextToken
        }
        notes
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProfessionalTeam = /* GraphQL */ `
  query GetProfessionalTeam($id: ID!) {
    getProfessionalTeam(id: $id) {
      name
      startYear
      endYear
      sportType
      description
      images {
        items {
          name
          url
          id
          createdAt
          updatedAt
          schoolSportImagesId
          professionalSportImagesId
          professionalTeamImagesId
          hallOfFameImagesId
          venueImagesId
        }
        nextToken
      }
      notes
      id
      createdAt
      updatedAt
    }
  }
`;
export const listProfessionalTeams = /* GraphQL */ `
  query ListProfessionalTeams(
    $filter: ModelProfessionalTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfessionalTeams(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        name
        startYear
        endYear
        sportType
        description
        images {
          nextToken
        }
        notes
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHallOfFame = /* GraphQL */ `
  query GetHallOfFame($id: ID!) {
    getHallOfFame(id: $id) {
      name
      inductionYear
      sport
      description
      notableAchievements
      images {
        items {
          name
          url
          id
          createdAt
          updatedAt
          schoolSportImagesId
          professionalSportImagesId
          professionalTeamImagesId
          hallOfFameImagesId
          venueImagesId
        }
        nextToken
      }
      notes
      id
      createdAt
      updatedAt
    }
  }
`;
export const listHallOfFames = /* GraphQL */ `
  query ListHallOfFames(
    $filter: ModelHallOfFameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHallOfFames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        inductionYear
        sport
        description
        notableAchievements
        images {
          nextToken
        }
        notes
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVenue = /* GraphQL */ `
  query GetVenue($id: ID!) {
    getVenue(id: $id) {
      name
      startYear
      endYear
      location
      description
      images {
        items {
          name
          url
          id
          createdAt
          updatedAt
          schoolSportImagesId
          professionalSportImagesId
          professionalTeamImagesId
          hallOfFameImagesId
          venueImagesId
        }
        nextToken
      }
      notes
      id
      createdAt
      updatedAt
    }
  }
`;
export const listVenues = /* GraphQL */ `
  query ListVenues(
    $filter: ModelVenueFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVenues(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        startYear
        endYear
        location
        description
        images {
          nextToken
        }
        notes
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSport = /* GraphQL */ `
  query GetSport($id: ID!) {
    getSport(id: $id) {
      type
      id
      createdAt
      updatedAt
    }
  }
`;
export const listSports = /* GraphQL */ `
  query ListSports(
    $filter: ModelSportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
      name
      url
      id
      createdAt
      updatedAt
      schoolSportImagesId
      professionalSportImagesId
      professionalTeamImagesId
      hallOfFameImagesId
      venueImagesId
    }
  }
`;
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        url
        id
        createdAt
        updatedAt
        schoolSportImagesId
        professionalSportImagesId
        professionalTeamImagesId
        hallOfFameImagesId
        venueImagesId
      }
      nextToken
    }
  }
`;
export const getWin = /* GraphQL */ `
  query GetWin($id: ID!) {
    getWin(id: $id) {
      winTitle
      school {
        name
        description
        school
        sport
        startYear
        endYear
        wins {
          nextToken
        }
        images {
          nextToken
        }
        notes
        id
        createdAt
        updatedAt
        schoolSportsId
      }
      year
      description
      notes
      id
      createdAt
      updatedAt
      schoolSportWinsId
    }
  }
`;
export const listWins = /* GraphQL */ `
  query ListWins(
    $filter: ModelWinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        winTitle
        school {
          name
          description
          school
          sport
          startYear
          endYear
          notes
          id
          createdAt
          updatedAt
          schoolSportsId
        }
        year
        description
        notes
        id
        createdAt
        updatedAt
        schoolSportWinsId
      }
      nextToken
    }
  }
`;

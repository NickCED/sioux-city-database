/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSchool = /* GraphQL */ `
  query GetSchool($id: ID!) {
    getSchool(id: $id) {
      name
      logoUrl
      description
      location
      sportsIds
      startYear
      endYear
      notes
      createdBy
      kioskReady
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
        location
        sportsIds
        startYear
        endYear
        notes
        createdBy
        kioskReady
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSchoolSport = /* GraphQL */ `
  query GetSchoolSport($sportId: String!) {
    getSchoolSport(sportId: $sportId) {
      name
      entryType
      description
      noWinsDescription
      school
      sport
      sportId
      startYear
      endYear
      wins
      images
      notes
      createdBy
      kioskReady
      createdAt
      updatedAt
    }
  }
`;
export const listSchoolSports = /* GraphQL */ `
  query ListSchoolSports(
    $sportId: String
    $filter: ModelSchoolSportFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSchoolSports(
      sportId: $sportId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        name
        entryType
        description
        noWinsDescription
        school
        sport
        sportId
        startYear
        endYear
        wins
        images
        notes
        createdBy
        kioskReady
        createdAt
        updatedAt
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
      sport
      teams
      description
      images
      notes
      createdBy
      kioskReady
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
        sport
        teams
        description
        images
        notes
        createdBy
        kioskReady
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProfessionalTeam = /* GraphQL */ `
  query GetProfessionalTeam($teamId: String!) {
    getProfessionalTeam(teamId: $teamId) {
      name
      entryType
      startYear
      endYear
      sport
      teamId
      wins
      description
      images
      notes
      createdBy
      kioskReady
      createdAt
      updatedAt
    }
  }
`;
export const listProfessionalTeams = /* GraphQL */ `
  query ListProfessionalTeams(
    $teamId: String
    $filter: ModelProfessionalTeamFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProfessionalTeams(
      teamId: $teamId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        name
        entryType
        startYear
        endYear
        sport
        teamId
        wins
        description
        images
        notes
        createdBy
        kioskReady
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
      entryType
      inductionYear
      sport
      description
      notableAchievements
      images
      notes
      createdBy
      kioskReady
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
        entryType
        inductionYear
        sport
        description
        notableAchievements
        images
        notes
        createdBy
        kioskReady
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
      entryType
      startYear
      endYear
      location
      description
      images
      notes
      createdBy
      kioskReady
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
        entryType
        startYear
        endYear
        location
        description
        images
        notes
        createdBy
        kioskReady
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
      createdBy
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
        createdBy
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($imageID: String!) {
    getImage(imageID: $imageID) {
      imageID
      thumbnailID
      name
      originalSize
      description
      preSignedUrl
      credits
      size
      type
      createdBy
      createdAt
      updatedAt
    }
  }
`;
export const listImages = /* GraphQL */ `
  query ListImages(
    $imageID: String
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listImages(
      imageID: $imageID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        imageID
        thumbnailID
        name
        originalSize
        description
        preSignedUrl
        credits
        size
        type
        createdBy
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWin = /* GraphQL */ `
  query GetWin($winID: String!) {
    getWin(winID: $winID) {
      winID
      name
      createdAt
      updatedAt
    }
  }
`;
export const listWins = /* GraphQL */ `
  query ListWins(
    $winID: String
    $filter: ModelWinFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listWins(
      winID: $winID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        winID
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

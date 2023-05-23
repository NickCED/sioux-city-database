/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSchool = /* GraphQL */ `
  mutation CreateSchool(
    $input: CreateSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    createSchool(input: $input, condition: $condition) {
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
export const updateSchool = /* GraphQL */ `
  mutation UpdateSchool(
    $input: UpdateSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    updateSchool(input: $input, condition: $condition) {
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
export const deleteSchool = /* GraphQL */ `
  mutation DeleteSchool(
    $input: DeleteSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    deleteSchool(input: $input, condition: $condition) {
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
export const createSchoolSport = /* GraphQL */ `
  mutation CreateSchoolSport(
    $input: CreateSchoolSportInput!
    $condition: ModelSchoolSportConditionInput
  ) {
    createSchoolSport(input: $input, condition: $condition) {
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
export const updateSchoolSport = /* GraphQL */ `
  mutation UpdateSchoolSport(
    $input: UpdateSchoolSportInput!
    $condition: ModelSchoolSportConditionInput
  ) {
    updateSchoolSport(input: $input, condition: $condition) {
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
export const deleteSchoolSport = /* GraphQL */ `
  mutation DeleteSchoolSport(
    $input: DeleteSchoolSportInput!
    $condition: ModelSchoolSportConditionInput
  ) {
    deleteSchoolSport(input: $input, condition: $condition) {
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
export const createProfessionalSport = /* GraphQL */ `
  mutation CreateProfessionalSport(
    $input: CreateProfessionalSportInput!
    $condition: ModelProfessionalSportConditionInput
  ) {
    createProfessionalSport(input: $input, condition: $condition) {
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
export const updateProfessionalSport = /* GraphQL */ `
  mutation UpdateProfessionalSport(
    $input: UpdateProfessionalSportInput!
    $condition: ModelProfessionalSportConditionInput
  ) {
    updateProfessionalSport(input: $input, condition: $condition) {
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
export const deleteProfessionalSport = /* GraphQL */ `
  mutation DeleteProfessionalSport(
    $input: DeleteProfessionalSportInput!
    $condition: ModelProfessionalSportConditionInput
  ) {
    deleteProfessionalSport(input: $input, condition: $condition) {
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
export const createProfessionalTeam = /* GraphQL */ `
  mutation CreateProfessionalTeam(
    $input: CreateProfessionalTeamInput!
    $condition: ModelProfessionalTeamConditionInput
  ) {
    createProfessionalTeam(input: $input, condition: $condition) {
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
export const updateProfessionalTeam = /* GraphQL */ `
  mutation UpdateProfessionalTeam(
    $input: UpdateProfessionalTeamInput!
    $condition: ModelProfessionalTeamConditionInput
  ) {
    updateProfessionalTeam(input: $input, condition: $condition) {
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
export const deleteProfessionalTeam = /* GraphQL */ `
  mutation DeleteProfessionalTeam(
    $input: DeleteProfessionalTeamInput!
    $condition: ModelProfessionalTeamConditionInput
  ) {
    deleteProfessionalTeam(input: $input, condition: $condition) {
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
export const createHallOfFame = /* GraphQL */ `
  mutation CreateHallOfFame(
    $input: CreateHallOfFameInput!
    $condition: ModelHallOfFameConditionInput
  ) {
    createHallOfFame(input: $input, condition: $condition) {
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
export const updateHallOfFame = /* GraphQL */ `
  mutation UpdateHallOfFame(
    $input: UpdateHallOfFameInput!
    $condition: ModelHallOfFameConditionInput
  ) {
    updateHallOfFame(input: $input, condition: $condition) {
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
export const deleteHallOfFame = /* GraphQL */ `
  mutation DeleteHallOfFame(
    $input: DeleteHallOfFameInput!
    $condition: ModelHallOfFameConditionInput
  ) {
    deleteHallOfFame(input: $input, condition: $condition) {
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
export const createVenue = /* GraphQL */ `
  mutation CreateVenue(
    $input: CreateVenueInput!
    $condition: ModelVenueConditionInput
  ) {
    createVenue(input: $input, condition: $condition) {
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
export const updateVenue = /* GraphQL */ `
  mutation UpdateVenue(
    $input: UpdateVenueInput!
    $condition: ModelVenueConditionInput
  ) {
    updateVenue(input: $input, condition: $condition) {
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
export const deleteVenue = /* GraphQL */ `
  mutation DeleteVenue(
    $input: DeleteVenueInput!
    $condition: ModelVenueConditionInput
  ) {
    deleteVenue(input: $input, condition: $condition) {
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
export const createSport = /* GraphQL */ `
  mutation CreateSport(
    $input: CreateSportInput!
    $condition: ModelSportConditionInput
  ) {
    createSport(input: $input, condition: $condition) {
      type
      createdBy
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateSport = /* GraphQL */ `
  mutation UpdateSport(
    $input: UpdateSportInput!
    $condition: ModelSportConditionInput
  ) {
    updateSport(input: $input, condition: $condition) {
      type
      createdBy
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteSport = /* GraphQL */ `
  mutation DeleteSport(
    $input: DeleteSportInput!
    $condition: ModelSportConditionInput
  ) {
    deleteSport(input: $input, condition: $condition) {
      type
      createdBy
      id
      createdAt
      updatedAt
    }
  }
`;
export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
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
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
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
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
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
export const createWin = /* GraphQL */ `
  mutation CreateWin(
    $input: CreateWinInput!
    $condition: ModelWinConditionInput
  ) {
    createWin(input: $input, condition: $condition) {
      winID
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateWin = /* GraphQL */ `
  mutation UpdateWin(
    $input: UpdateWinInput!
    $condition: ModelWinConditionInput
  ) {
    updateWin(input: $input, condition: $condition) {
      winID
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteWin = /* GraphQL */ `
  mutation DeleteWin(
    $input: DeleteWinInput!
    $condition: ModelWinConditionInput
  ) {
    deleteWin(input: $input, condition: $condition) {
      winID
      name
      createdAt
      updatedAt
    }
  }
`;

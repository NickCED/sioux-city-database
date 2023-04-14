/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSchool = /* GraphQL */ `
  subscription OnCreateSchool($filter: ModelSubscriptionSchoolFilterInput) {
    onCreateSchool(filter: $filter) {
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
export const onUpdateSchool = /* GraphQL */ `
  subscription OnUpdateSchool($filter: ModelSubscriptionSchoolFilterInput) {
    onUpdateSchool(filter: $filter) {
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
export const onDeleteSchool = /* GraphQL */ `
  subscription OnDeleteSchool($filter: ModelSubscriptionSchoolFilterInput) {
    onDeleteSchool(filter: $filter) {
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
export const onCreateSchoolSport = /* GraphQL */ `
  subscription OnCreateSchoolSport(
    $filter: ModelSubscriptionSchoolSportFilterInput
  ) {
    onCreateSchoolSport(filter: $filter) {
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
export const onUpdateSchoolSport = /* GraphQL */ `
  subscription OnUpdateSchoolSport(
    $filter: ModelSubscriptionSchoolSportFilterInput
  ) {
    onUpdateSchoolSport(filter: $filter) {
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
export const onDeleteSchoolSport = /* GraphQL */ `
  subscription OnDeleteSchoolSport(
    $filter: ModelSubscriptionSchoolSportFilterInput
  ) {
    onDeleteSchoolSport(filter: $filter) {
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
export const onCreateProfessionalSport = /* GraphQL */ `
  subscription OnCreateProfessionalSport(
    $filter: ModelSubscriptionProfessionalSportFilterInput
  ) {
    onCreateProfessionalSport(filter: $filter) {
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
export const onUpdateProfessionalSport = /* GraphQL */ `
  subscription OnUpdateProfessionalSport(
    $filter: ModelSubscriptionProfessionalSportFilterInput
  ) {
    onUpdateProfessionalSport(filter: $filter) {
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
export const onDeleteProfessionalSport = /* GraphQL */ `
  subscription OnDeleteProfessionalSport(
    $filter: ModelSubscriptionProfessionalSportFilterInput
  ) {
    onDeleteProfessionalSport(filter: $filter) {
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
export const onCreateProfessionalTeam = /* GraphQL */ `
  subscription OnCreateProfessionalTeam(
    $filter: ModelSubscriptionProfessionalTeamFilterInput
  ) {
    onCreateProfessionalTeam(filter: $filter) {
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
export const onUpdateProfessionalTeam = /* GraphQL */ `
  subscription OnUpdateProfessionalTeam(
    $filter: ModelSubscriptionProfessionalTeamFilterInput
  ) {
    onUpdateProfessionalTeam(filter: $filter) {
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
export const onDeleteProfessionalTeam = /* GraphQL */ `
  subscription OnDeleteProfessionalTeam(
    $filter: ModelSubscriptionProfessionalTeamFilterInput
  ) {
    onDeleteProfessionalTeam(filter: $filter) {
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
export const onCreateHallOfFame = /* GraphQL */ `
  subscription OnCreateHallOfFame(
    $filter: ModelSubscriptionHallOfFameFilterInput
  ) {
    onCreateHallOfFame(filter: $filter) {
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
export const onUpdateHallOfFame = /* GraphQL */ `
  subscription OnUpdateHallOfFame(
    $filter: ModelSubscriptionHallOfFameFilterInput
  ) {
    onUpdateHallOfFame(filter: $filter) {
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
export const onDeleteHallOfFame = /* GraphQL */ `
  subscription OnDeleteHallOfFame(
    $filter: ModelSubscriptionHallOfFameFilterInput
  ) {
    onDeleteHallOfFame(filter: $filter) {
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
export const onCreateVenue = /* GraphQL */ `
  subscription OnCreateVenue($filter: ModelSubscriptionVenueFilterInput) {
    onCreateVenue(filter: $filter) {
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
export const onUpdateVenue = /* GraphQL */ `
  subscription OnUpdateVenue($filter: ModelSubscriptionVenueFilterInput) {
    onUpdateVenue(filter: $filter) {
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
export const onDeleteVenue = /* GraphQL */ `
  subscription OnDeleteVenue($filter: ModelSubscriptionVenueFilterInput) {
    onDeleteVenue(filter: $filter) {
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
export const onCreateSport = /* GraphQL */ `
  subscription OnCreateSport($filter: ModelSubscriptionSportFilterInput) {
    onCreateSport(filter: $filter) {
      type
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSport = /* GraphQL */ `
  subscription OnUpdateSport($filter: ModelSubscriptionSportFilterInput) {
    onUpdateSport(filter: $filter) {
      type
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSport = /* GraphQL */ `
  subscription OnDeleteSport($filter: ModelSubscriptionSportFilterInput) {
    onDeleteSport(filter: $filter) {
      type
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage($filter: ModelSubscriptionImageFilterInput) {
    onCreateImage(filter: $filter) {
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
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage($filter: ModelSubscriptionImageFilterInput) {
    onUpdateImage(filter: $filter) {
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
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage($filter: ModelSubscriptionImageFilterInput) {
    onDeleteImage(filter: $filter) {
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
export const onCreateWin = /* GraphQL */ `
  subscription OnCreateWin($filter: ModelSubscriptionWinFilterInput) {
    onCreateWin(filter: $filter) {
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
export const onUpdateWin = /* GraphQL */ `
  subscription OnUpdateWin($filter: ModelSubscriptionWinFilterInput) {
    onUpdateWin(filter: $filter) {
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
export const onDeleteWin = /* GraphQL */ `
  subscription OnDeleteWin($filter: ModelSubscriptionWinFilterInput) {
    onDeleteWin(filter: $filter) {
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

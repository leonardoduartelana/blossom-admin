// ----------------------------------------------------------------------

export const account = {
  loaded: false,
  id: null,
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_25.jpg',

  fromProfile(profile) {
    this.loaded = true
    this.email = profile.email
    this.displayName = `${profile.firstName} ${profile.lastName}`
    this.id = profile.id
  }

};

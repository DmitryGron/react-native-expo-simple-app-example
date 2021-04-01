import { observable, toJS } from 'mobx';

const People = [
    {id: 1, name: 'Valera', tags: ['#architecture', '#construction', '#framing'], location: { latitude: '56.96155251536892', longitude: '24.137588260369867'}, dateFrom: '2021-03-19T20:52:47.000Z', dateTo: '2021-05-19T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 12 },
    {id: 2, name: 'Sama', tags: ['#woodworker', '#wood'], location: { latitude: '56.948050980664625', longitude: '24.112780356715575'}, dateFrom: '2021-04-19T20:52:47.000Z', dateTo: '2021-05-19T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 11},
    {id: 3, name: 'Petra', tags: ['#waiter', '#service'], location: { latitude: '56.948532059997', longitude: '24.12454524374844'}, dateFrom: '2021-04-19T20:52:47.000Z', dateTo: '2021-05-19T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 10},
    {id: 4, name: 'Augusta', tags: ['#nurse', '#medicine'], location: { latitude: '56.95340633003813', longitude: '24.1205422668536'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 9},
    {id: 5, name: 'Charlie', tags: ['#repairman', '#repair'], location: { latitude: '56.95641616399342', longitude: '24.110894322934623'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 8},
    {id: 6, name: 'Lucia', tags: ['#painter', '#art'], location: { latitude: '56.953458628136914', longitude: '24.101687551906426'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 7},
    {id: 7, name: 'Everett', tags: ['#gardener', '#horticulturalists'], location: { latitude: '56.95468745629629', longitude: '24.100121105570302'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 6},
    {id: 8, name: 'Ian', tags: ['#builder', '#construction'], location: { latitude: '56.95010208523552', longitude: '24.101662012953554'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 5},
    {id: 9, name: 'Maia', tags: ['#photographer', '#photo', '#art'], location: { latitude: '56.94811094912502', longitude: '24.113304398858133'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 4},
    {id: 10, name: 'Aurora', tags: ['#doorman', '#gatekeeper'], location: { latitude: '56.948662329021985', longitude: '24.11464619096244'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 3},
    {id: 11, name: 'Magnus', tags: ['#electrician', '#lineman', '#electric'], location: { latitude: '56.947028935190644', longitude: '24.115306195558176'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 0},
    {id: 14, name: 'Alexa', tags: ['#secretary', '#assistant', '#administrator'], location: { latitude: '56.947499344494624', longitude: '24.104279915565762'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 12},
    {id: 15, name: 'Alexander', tags: ['#mechanic', '#technician', '#repairman'], location: { latitude: '56.94499487316778', longitude: '24.10997794437455'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 11},
    {id: 16, name: 'Benjamin', tags: ['#magician', '#wizard', '#illusionist'], location: { latitude: '56.947992627911944', longitude: '24.105879969645233'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 10},
    {id: 17, name: 'Jamy', tags: ['#lifeguard', '#lifesaver'], location: { latitude: '56.9488635297136', longitude: '24.119192967312102'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 9},
    {id: 18, name: 'Harvey', tags: ['#forestranger', '#ranger', '#forester'], location: { latitude: '56.944255693189', longitude: '24.117066466963255'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 7},
    {id: 19, name: 'Eve', tags: ['#driver', '#wheelman', '#cardriver'], location: { latitude: '56.95331246836283', longitude: '24.100177827876955'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 4},
    {id: 20, name: 'Ezra', tags: ['#driver', '#wheelman'], location: { latitude: '56.95331246836283', longitude: '24.100177827876955'}, dateFrom: '2021-05-01T20:52:47.000Z', dateTo: '2021-05-20T20:52:47.000Z', img: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60', rating: 4},
  ];

export function createStore() {
    return {
      LoggedIn: observable.box(false),
      setLoggedIn(data: boolean) {
        this.LoggedIn.set(data);
      },
      getLoggedIn() {
        return toJS(this.LoggedIn);
     },
      get filteredPeople() {
        return People;
      },
      savedPeople: observable.array(),
      setSavedPeople(data: any) {
        this.savedPeople.push(data);
      },
      getSavedPeople() {
        return toJS(this.savedPeople);
     },
     removePeople(person: any) {
      const current = toJS(this.savedPeople);
      current.map((item, index) => {
        if (person.id === item.id) this.savedPeople.splice(index, 1);
      });
     },
      searchData: observable.map(),
      getData(key: string) {
        return toJS(this.searchData.get(key));
      },
      setData(storage: string, data: any[]) {
        this.searchData.set(storage, data);
      },
    };
  }

export type TStore = ReturnType<typeof createStore>;

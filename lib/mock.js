export const OWNERS = [
    {id: 1, name: 'João Pedro Rocha'},
    {id: 2, name: 'Breno Fernandes Paula'},
    {id: 3, name: 'Celmo Vieira Borges'},
    {id: 4, name: 'Bianca Teixeira Cardodo Rocha'},
]

export const COWS = [
    { id: 1, gender: 'female', birthMonth: '2021-05', ownerId: 1, owner: OWNERS.filter(el => el.id === 1)[0] },
    { id: 2, gender: 'female', birthMonth: '2021-03', ownerId: 1, owner: OWNERS.filter(el => el.id === 1)[0] },
    { id: 3, gender: 'male', birthMonth: '2021-01', ownerId: 1, owner: OWNERS.filter(el => el.id === 1)[0] },
    { id: 4, gender: 'male', birthMonth: '2021-01', ownerId: 2, owner: OWNERS.filter(el => el.id === 2)[0] },
]

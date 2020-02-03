export const teamOptions = [
    {
        value: 'England',
        label: 'England',
        children: [
            {
                value: 'Liverpool',
                label: 'Liverpool'
            },
            {
                value: 'Man United',
                label: 'Man United'
            }
        ]
    },
    {
        value: 'Spain',
        label: 'Spain',
        children: [
            {
                value: 'Great Teams',
                label: 'Great Teams',
                children: [
                    {
                        value: 'Real Madrid',
                        label: 'Real Madrid'
                    }
                ]
            },
            {
                value: 'Horrible Teams',
                label: 'Horrible Teams',
                children: [
                    {
                        value: 'Barcelona',
                        label: 'Barcelona'
                    },
                    {
                        value: 'Atletico Madrid',
                        label: 'Atletico Madrid',
                        disabled: true
                    }
                ]
            }
        ]
    }
];

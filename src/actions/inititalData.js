export const initialData = {
    board: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-2', 'column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'To do column 1',
                    cardOrder: ['card-1', 'card-2', 'card-3'],
                    cards: [
                        {
                            id: 'card-1',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 1',
                            cover: "https://f40-zpg.zdn.vn/5907652352288567255/ffd08cfe8bff79a120ee.jpg"
                        },
                        {
                            id: 'card-2',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'Title of card 2',
                            cover: null
                        },
                        {
                            id: 'card-3',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'Title of card 3',
                            cover: null
                        }
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'To do column 2',
                    cardOrder: ['card-4', 'card-5', 'card-6'],
                    cards: [
                        {
                            id: 'card-4',
                            boardId: 'board-1',
                            columnId: 'column-1',
                            title: 'Title of card 1',
                            cover: "https://f40-zpg.zdn.vn/5907652352288567255/ffd08cfe8bff79a120ee.jpg"
                        },
                        {
                            id: 'card-5',
                            boardId: 'board-1',
                            columnId: 'column-2',
                            title: 'Title of card 2',
                            cover: null                        },
                        {
                            id: 'card-6',
                            boardId: 'board-1',
                            columnId: 'column-3',
                            title: 'Title of card 3',
                            cover: null                        }
                    ]
                },
             ]
        }
    ]
}
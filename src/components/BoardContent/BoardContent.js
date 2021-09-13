import React, { useState,useEffect } from 'react'
import './BoardContent.scss'
import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sort'
import {initialData} from 'actions/inititalData'
import { isEmpty } from 'lodash'
function BoardContent() {
    const [ board, setBoard ] = useState({})
    const [columns, setColumns]  = useState({})

    useEffect(()=>{
        const boardFromDB = initialData.board.find(board => board.id === 'board-1')
        if(boardFromDB) {
            setBoard(boardFromDB);
            
            // sort column
            
            setColumns(mapOrder(boardFromDB.columns,boardFromDB.columnOrder,'id'));
        }
    }, []);

    if(isEmpty(board)) {
        return <div className="not-found">Not Found</div>
    }

    return (
        <div className="board-content">
            { columns.map((item,index) => {
                    return <Column key={index} column={item}/>
                }) };
       </div>

    )
}
export default BoardContent;
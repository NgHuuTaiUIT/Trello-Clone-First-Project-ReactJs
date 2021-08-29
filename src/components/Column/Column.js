import React from 'react'
import './Column.scss'
import Task from 'components/Task/Task'
function Column() {

    return (
        <div className="column">
        <header>Brainstorm</header>
        <ul className="task-listS">
            <Task/>
          <li className="task-item">Them 1 cai j ban thich</li>
          <li className="task-item">Them 1 cai j ban thich</li>
          <li className="task-item">Them 1 cai j ban thich</li>
          <li className="task-item">Them 1 cai j ban thich</li>
        </ul>
        <footer>Add another card</footer>
     </div>
    )
}
export default Column;
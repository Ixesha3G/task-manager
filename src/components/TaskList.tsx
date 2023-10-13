import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Task } from '../interfaces/Task';

interface TaskListProps {
	taskList: Array<Task>;
	setTaskList: (taskList: Array<Task>) => void;
}

const TaskList = ({ taskList, setTaskList }: TaskListProps) => {
	return (
		<div className='p-3'>
            {taskList.length > 0 ? 			<Table striped bordered hover className='px-3'>
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
						<th>Due Date</th>
						<th>Category</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{taskList.map((task, idx) => {
						return (
							<tr key={idx}>
								<td>{task.id}</td>
								<td>{task.title}</td>
								<td>{task.dueDate.toString()}</td>
								<td>{task.category}</td>
								<td>
									<Button
										variant='danger'
										onClick={() => {
											setTaskList(
												taskList.filter((filterTask) => {
													return task.id !== filterTask.id;
												})
											);
											localStorage.setItem(
												'taskList',
												JSON.stringify(
													taskList.filter((filterTask) => {
														return task.id !== filterTask.id;
													})
												)
											);
										}}
									>
										Delete
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table> : <p>Not task yet</p>}

		</div>
	);
};

export default TaskList;

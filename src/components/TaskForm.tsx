import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import categories from '../categories';
import { Task } from '../interfaces/Task'
import { useFormik } from 'formik';
import { date, object, string } from 'yup';

interface TaskFormProps {
    taskList: Array<Task>;
    setTaskList: (taskList: Array<Task>) => void;
}

const TaskForm = ({taskList, setTaskList}: TaskFormProps) => {
    const TaskSchema = object<Task>().shape({
        title: string().min(3, 'Title should be at least 3 characters.').required('Required'),
        dueDate: date().max(10, 'Invalid date. The format should be dd/mm/yyyy.').required('Required'),
        category: string().required('Required')
    } || undefined);

    const formik = useFormik({
        initialValues:{id: 0, title: '', dueDate: new Date(), category: '' },
        onSubmit: (values: Task) => {       
            setTaskList([...taskList, {...values, id: taskList.length > 0 ? taskList[taskList.length - 1].id + 1 : 0}])
        },
        validationSchema: TaskSchema
    })
	return (
			<Form className='p-3' onSubmit={formik.handleSubmit}>
				<Form.Group className='mb-3' controlId='title'>
					<Form.Label>Title</Form.Label>
					<Form.Control type='text' placeholder='Enter a title' onChange={formik.handleChange('title')} onBlur={formik.handleBlur} value={formik.values.title}/>
                    <Form.Text className='fw-bold text-danger'>{formik.touched.title && formik.errors.title}</Form.Text>
				</Form.Group>

				<Form.Group className='mb-3' controlId='dueDate'>
					<Form.Label>Due Date</Form.Label>
					<Form.Control type='date' onChange={formik.handleChange('dueDate')} onBlur={formik.handleBlur} value={formik.values.dueDate.toLocaleString()}/>
                    <Form.Text className='fw-bold text-danger'>{formik.touched.dueDate && formik.errors.dueDate as string}</Form.Text>
				</Form.Group>

				<Form.Group className='mb-3' controlId='category'>
					<Form.Label>Categories</Form.Label>
					<Form.Select onChange={formik.handleChange('category')} onBlur={formik.handleBlur} value={formik.values.category}>
						<option></option>
						{categories.map((category, idx) => {
							return <option key={idx} value={category}>{category}</option>;
						})}
					</Form.Select>
                    <Form.Text className='fw-bold text-danger'>{formik.touched.category && formik.errors.category}</Form.Text>
				</Form.Group>

				<Button variant='primary' type='submit' className='mt-3'>
					Submit
				</Button>
			</Form>
	);
};

export default TaskForm;

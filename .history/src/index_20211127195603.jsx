import api, { route } from "@forge/api";
import ForgeUI, {
  render,
  Fragment,
  IssuePanel,
  useProductContext,
  useState,
  Heading,
  DatePicker,
  Text,
  Image,

} from "@forge/ui";

import shortid from "shortid";

import { TaskList, NewTaskForm } from "./components";
import { useTasks } from "./hooks/use-tasks";

const fetchCommentsForIssue = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueId}/comment`);

  const data = await res.json();
  return data.comments;
};

const App = () => {
  const [tasks, updateTasks] = useTasks();
  const context = useProductContext();
  const [comments] = useState(
    async () => await fetchCommentsForIssue(context.platformContext.issueKey)
  );

  const updateTask = async (id, isChecked) => {
    await updateTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isChecked: isChecked,
          };
        } else {
          return task;
        }
      })
    );
  };

  const deleteTask = async (id) => {
    await updateTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const createTask = async (text) => {
    await updateTasks((tasks) => [
      ...tasks,
      {
        id: shortid.generate(),
        text,
      },
    ]);
  };

  const createDate = async (text) => {
    await updateTasks((date) => [
      ...date,
      {
        id: shortid.generate(),
        text,
      },
    ]);
  };

  return (
    <Fragment>
      <Heading size="large">Tasks Manager</Heading>
      <Image
        src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt="homer"
      />
      <Heading size="medium">Number of comments on this issue: {comments.length}</Heading>
      <Text>Number of uncomplete tasks: {tasks.length}</Text>
      <NewTaskForm onCreate={createTask} />
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);

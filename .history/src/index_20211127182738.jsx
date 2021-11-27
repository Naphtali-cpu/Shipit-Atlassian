import api, { route } from "@forge/api";
import ForgeUI, {
  render,
  Fragment,
  IssuePanel,
  useProductContext,
  useState,
  Heading,
  DatePicker
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


  console.log(`Number of comments on this issue: ${comments.length}`);
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

  return (
    <Fragment>
      <Heading size="large">Tasks Manager</Heading>

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

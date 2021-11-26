import ForgeUI, { render, Fragment, Text, IssuePanel, useProductContext, useState } from '@forge/ui';
import api, { route } from '@forge/api';


const App = () => {
  const context = useProductContext();
  const [comments] = useState(async () => await fetchCommentsForIssue(context.))
  return (
    <Fragment>
      <Text>Hello world, I'm Naphtali</Text>
      <Text>Second Trial again</Text>
    </Fragment>
  );
};
// Function that calls Jira REST API

const fetchCommentsForIssue = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueId}/comment`);

  const data = await res.json();
  return data.comments;
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);

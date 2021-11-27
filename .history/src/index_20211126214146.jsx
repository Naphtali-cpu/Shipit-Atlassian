import api, { route } from "@forge/api";
import ForgeUI, { render, Fragment, Text, IssuePanel, useProductContext, useState, Image, Avatar } from "@forge/ui";

const fetchCommentsForIssue = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueId}/comment`);

  const data = await res.json();
  return data.comments;
};

const App = () => {
  const context = useProductContext();
  const [comments] = useState(async () => await fetchCommentsForIssue(context.platformContext.issueKey));

  console.log(`Number of comments on this issue: ${comments.length}`);

  return (
    <Fragment>
      <Avatar accountId="c0536030-91ed-4b18-a326-499fc5d3faa2" />
      
      <Text>
        Number of comments on this issue: {comments.length}
      </Text>
      <Image src="https://media.giphy.com/media/jUwpNzg9IcyrK/source.gif" alt="homer"
/>
  </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
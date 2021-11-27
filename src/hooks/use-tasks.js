import { useIssueProperty } from '@forge/ui-jira';

const ISSUE_PROPERTY_PREFIX = 'novida-';

export const useTasks = () => useIssueProperty(ISSUE_PROPERTY_PREFIX + 'tasks', []);
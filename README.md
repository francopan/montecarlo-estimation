# Montecarlo Estimation

This program uses historic data from recent sprint to estimate how many sprints it will take to complete a project.

~~~
npm run start
~~~

## Prompt Parameters
When running, you'll be prompted to type the information below:

- Number of stories: Number of stories/requirements the project has. Do not mistake for story points.
- Percentage of sprint allocation: Percentage of sprint dedicated to this project. (from 0 up to 1) [0, 0.1, 0.2, ... 1]

### Inner Parameters
In the code, there are parameters that must be changed in order to modify the output.

- historicStoriesPerSprint: List of story points completed per sprint.
- MAX: Max number of iterations.
- NEW_TASK_EVERY_10: Number of tasks created every 10 done.
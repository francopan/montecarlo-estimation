# Montecarlo Estimation

This program uses historic data from recent sprints to estimate how many sprints it will take to complete a project.

~~~
npm run start
~~~

## Prompt Parameters
When running, you'll be prompted to type the information below:

- Number of story points: Number of story points the project have (It works for number of stories as well).
- Percentage of sprint allocation: Percentage of sprint dedicated to this project. (from 0 up to 1) [0, 0.1, 0.2, ... 1]

### Other Parameters
In the code, there are parameters that must be changed in order to modify the output.

- MAX_ROUNDS: Max number of iterations.
- NEW_TASK_EVERY_10: Number of tasks created every 10 done.

Also, there is a file called *sprints.csv*. There you should list your sprints and the sum of story points completed for each sprint (It works for number of stories as well).
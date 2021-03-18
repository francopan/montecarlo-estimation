# Montecarlo Estimation (Number of sprints to finish a project)

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

## Example

~~~
✔ What is the target number of story points for the project?  · 34
✔ What is the percentage of story points for this project over the entire sprint (from 0 to 1)?  · 0.75
Sprint          Total   | Percentage of Confidence of finishing project
2       =       396     | 3.9600000000000004%
3       =       4709    | 47.089999999999996%
4       =       9152    | 91.52%
5       =       9968    | 99.68%
6       =       9999    | 99.99%
7       =       10000   | 100%
~~~

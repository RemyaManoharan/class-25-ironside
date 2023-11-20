# Iron-side Job Search React App
A complete full stack project developed using typecript,react,nodejs.
Added functionality to search for the job, apply for job ,search for company for users. Admin has 
wide range of functinalities including giving approval/rejection for company and job.Admin can view total jobs,companies registered.
For state managemnt used Zustand .Done as part of Hack Your future Group project.

In order to start and install all the dependencies run:

```bash
npm run init-project
![adminpage](https://github.com/RemyaManoharan/class-25-ironside/assets/114389785/60811d6f-ee30-434b-9227-2d699d5f0ee1)


It will install dependencies in all the workspaces

To build the whole project - run:

```bash
npm run build
```

To start the development process - run:

```bash
npm start
```

### Deployment guide

For the deployment process we are going to use [Render](https://render.com/), deploying our webservice and PostgreSQL database.
For the deployment guide you can always reference to [this link](https://github.com/HackYourFuture-CPH/deployment-guide/blob/main/render-deployment-docs/Deployment.md)

We would be using deployment process to deploy to the production and our `main` branch would be used as a trigger for the deployment.

### Workflow rules

For the workflow we would be working by the `Git Flow` using `Feature branches`
You can reference for the guide [here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

In short - this means that we would have two main branches `main` and `dev`.
`main` branch would have all the production changes that we want to be deployed.
`dev` branch collects all the latest changes that were made.
If we want to deploy a new version to production, we create a pull request of a `dev` branch to `main` and after the approval we merge them.

`Feature branch` - is just a naming convention for how you should name your branches when you create certain features. For example, you can create your branches based on the freature you are developing (auth, header, chart etc.), or even by the number of a task in your Kanban board.

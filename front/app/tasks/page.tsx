import TaskList from "./components/TasksList";

export default function TasksPage() {
  return (
    <div>
      {/* <section className="flex justify-center">
        <div className="w-[45%] my-[50px]">
          <h1 className="text-4xl"></h1>
        </div>
        <div className="w-[45%] my-[50px]">
          <ButtonNewTask />
          <ButtonCreateTask />
        </div>
      </section> */}
      <section className="flex justify-center gap-10 my-10">
        <TaskList title="To Do" tasksStatus={0} />
        <TaskList title="Complete" tasksStatus={1} />
      </section>
    </div>
  );
}

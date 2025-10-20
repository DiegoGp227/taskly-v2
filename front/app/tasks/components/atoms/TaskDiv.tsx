interface tasks {
  user_id?: number;
  topics_id?: number;
  title: string;
  priority?: number;
  status?: number;
}

function TaskDiv({ title }: tasks) {
  return (
    <div className="w-[95%] py-[10px] flex justify-between gap-10 border-2 border-soft-gray">
      <div>
        <form action="send" className="flex gap-3 px-2">
          <input
            type="checkbox"
            className="flex items-center gap-[12px] cursor-pointer text-[1rem] 
         px-[15px] py-[10px] rounded-[8px] bg-transparent 
         transition-colors duration-300 ease-in-out 
         select-none text-[#ccc] relative"
          />
          <label className="">{title}</label>
        </form>
      </div>
      <div className="flex gap-5">
        {/* <EditTask />
        <DeleteTask id={id} stateDelectClick={stateDelect} /> */}
      </div>
    </div>
  );
}

export default TaskDiv;

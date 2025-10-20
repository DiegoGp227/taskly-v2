"use client"

export default function ButtonCreateTask() {
  return (
    <>
      <div
        className="fixed z-[1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-[400px] h-[400px] bg-[var(--background-color-black)] 
            rounded-[var(--border-radius)] border-2 border-[var(--background-actions)] 
            flex justify-center items-center flex-col m-auto"
      >
        <h1>New tasks</h1>
        <input
          className="w-[350px] h-[44px] bg-[var(--background-color-black)] rounded-[var(--border-radius)] 
         border-2 border-[var(--border-color)] 
         text-[var(--font-size-base)] m-[10px] outline-none pl-[15px] 
         focus:border-[var(--background-actions)]"
          type="text"
          placeholder="task"
        />
        <form action="dialog" className="w-full flex flex-col items-center ">
          <button
            type="submit"
            className="w-[70%] h-[44px] flex justify-center items-center mt-[20px] gap-[7px] 
         bg-[var(--background-color-black)] rounded-[var(--border-radius)] 
         border-2 border-[var(--background-actions)] cursor-pointer 
         transition-[var(--transition-time)] 
         hover:bg-[var(--background-actions)] hover:text-black"
            onClick={() => {}}
          >
            send
          </button>
        </form>
      </div>
    </>
  );
}

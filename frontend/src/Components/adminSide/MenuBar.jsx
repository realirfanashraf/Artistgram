const MenuBar = () => {
  return (
    <div className="bg-secondary rounded-lg hidden md:block ">
              <div className="p-4">
                <div className="flex flex-col items-center">
                  <a href="#" className="btn text-primary border-primary md:border-2 hover:bg-primary hover:text-white mb-4 w-full max-w-md">Dashboard</a>
                  <a href="#" className="btn text-primary border-primary md:border-2 hover:bg-primary hover:text-white mb-4 w-full max-w-md">User Management</a>
                  <a href="#" className="btn text-primary border-primary md:border-2 hover:bg-primary hover:text-white mb-4 w-full max-w-md">Post Management</a>
                </div>
              </div>
            </div>
  )
}

export default MenuBar
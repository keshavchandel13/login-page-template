import React from "react";
export default function Main() {
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
  return (
    <div className="h-screen w-screen">
      <nav >
				<h1>fakebook</h1>
				<button  onClick={handleLogout}>
					Logout
				</button>
			</nav>
    </div>
  );
}

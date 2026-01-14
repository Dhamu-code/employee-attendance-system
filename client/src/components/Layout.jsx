import "./layout.css";

function Layout({ sidebar, title, children }) {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="logo">EmployeeSys</h2>
        {sidebar}
      </aside>

      <main className="main">
        <header className="header">
          <h1>{title}</h1>
        </header>

        <section className="content">
          {children}
        </section>
      </main>
    </div>
  );
}

export default Layout;

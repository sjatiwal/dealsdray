import { Link } from "react-router-dom";
function Table({ header, rows, deleteHandler }) {
  return (
    <>
      <table>
        <thead>
          <tr className="border-[2px] border-black">
            {header.map((item) => {
              return (
                <th
                  key={item.data}
                  className="border-[2px] border-black px-[4px]"
                >
                  {item.name}
                </th>
              );
            })}
            <th className="border-[2px] border-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((data) => {
            return (
              <tr key={data.id} className="border-[2px] border-black">
                {header.map((item) => {
                  return (
                    <td
                      key={data[item.data]}
                      className="border-[2px] border-black px-[4px]"
                    >
                      {item.data === "img" ? (
                        <div className="w-[20px] h-[20px]">
                          <img
                            require={data[item.data]}
                            alt="uploading"
                            className="h-full w-full"
                          />
                        </div>
                      ) : (
                        data[item.data]
                      )}
                    </td>
                  );
                })}
                <td className="px-[4px] py-[2px]">
                  <button
                    className="mr-[2px] bg-red-500 px-[4px] rounded-[4px]"
                    onClick={() => {
                      deleteHandler(data.id);
                    }}
                  >
                    Delete
                  </button>
                  <Link to={`/editemployee/${data.id}`}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;

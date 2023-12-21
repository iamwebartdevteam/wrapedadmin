import React from "react";

const OrderTable = ({ data, title, order_delete }) => {
  return (
    <>
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
        <div class="widgets ecommerce-tables">
          <div class="widget-contents">
            <div class="table-responsive text-center">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>
                      <div class="th-content">Order Id</div>
                    </th>
                    <th>
                      <div class="th-content">Client</div>
                    </th>
                    <th>
                      <div class="th-content">Song Name</div>
                    </th>
                    <th>
                      <div class="th-content">Amount</div>
                    </th>
                    <th>
                      <div class="th-content">Fulfillment Status</div>
                    </th>
                    <th>
                      <div class="th-content">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1} </td>
                      <td>{item.user}</td>
                      <td>{item.user}</td>
                      <td>$ {item.amount}</td>
                      <td>
                        {item.is_paid ? (
                          <span class="badge badge-success ">Completed</span>
                        ) : (
                          <span class="badge badge-info">In-Completed</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            onClick={() => order_delete(item.id)}
                            class="align-items-center btn btn-danger d-flex font-20 px-2"
                          >
                            <i class="las la-times-circle"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTable;

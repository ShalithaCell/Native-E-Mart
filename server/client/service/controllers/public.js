function myAccountOnClickHandler() {
    console.log('clicked');
    const sessionData = getSession();

    if (!sessionData.authenticated) {
        window.location.href = "./dashboard/auth-login.html";
        return ;
    }

    $.confirm({
        title: 'My Account',
        columnClass: 'col-md-12',
        content: `
            <div class="card mt-3">
                <div class="card-header">
                Profile
                </div>
                <div class="card-body">
                    <div>
                      <div class="form-group">
                        <label for="txtEmail">Email address</label>
                        <input type="email" class="form-control" id="txtEmail" aria-describedby="emailHelp" placeholder="Enter email" disabled>
                      </div>
                      <div class="form-group">
                        <label for="txtName">Name</label>
                        <input type="text" class="form-control" id="txtName" placeholder="Name">
                      </div>
                      <div class="form-group">
                        <label for="txtPhone">Phone</label>
                        <input type="Tel" class="form-control" id="txtPhone" placeholder="Phone">
                      </div>
                      <button type="button" class="btn btn-danger" onclick="resetPassword()">Reset-Password</button>
                      <button type="button" class="btn btn-primary float-right">Submit</button>
                    </div>
                </div>
            </div>
            <div class="card mt-3">
              <div class="card-header">
                Orders
              </div>
              <div class="card-body">
                <table class="table" id="tblPortfolio">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                </tbody>
            </table>
              </div>
            </div>
            
    `,
        buttons: {
            cancel: function () {
                //close
            },
        },
        onContentReady: function () {
            $('#tblPortfolio').DataTable();

            this.$content.find("#txtEmail").val(sessionData.authData.user.email);
            this.$content.find("#txtName").val(sessionData.authData.user.name);
            this.$content.find("#txtPhone").val(sessionData.authData.user.phone);

            // const email = this.$content.find("#exampleInputEmail1").val();
            // const name = this.$content.find("#txtName").val();
            // const phone = this.$content.find("#txtPhone").val();
            //
            // if(!email) return ;
            //
            // if(!name){
            //     $.alert('Name is required.');
            //     return ;
            // }
            // if(!phone){
            //     $.alert('phone is required.');
            //     return ;
            // }
        }
    });
};

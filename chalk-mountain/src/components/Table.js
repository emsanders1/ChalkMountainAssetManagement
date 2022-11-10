export default function Table(){
    return (
    <div className="tableSection">
    <table>
      <tr className="tableheader">
        <th>ASSEST</th>
        <th>STATUS</th>
        <th>DATE LAST MODIFIED</th>
        <th>Employee</th>
        <th>Notes</th>
        <th>Modify</th>
      </tr>
      <tr>
        <td>ABC</td>
        <td>IN-SERVICE</td>
        <td>02/12/2022</td>
        <td>J.F.</td>
        <td></td>
        <td><button>Update</button></td>
      </tr>
      <tr>
        <td>DEF</td>
        <td>OUT-OF-SERVICE</td>
        <td>08/19/2022</td>
        <td>M.B.</td>
        <td>Punctured tire</td>
        <td><button>Update</button></td>
      </tr>
      <tr>
        <td>GHI</td>
        <td>OUT-OF-SERVICE</td>
        <td>07/03/2022</td>
        <td>E.S.</td>
        <td>Needs New Shocks</td>
        <td><button>Update</button></td>
      </tr>
      <tr>
        <td>JKL</td>
        <td>IN-SERVICE</td>
        <td>06/28/2022</td>
        <td>Z.N.</td>
        <td></td>
        <td><button>Update</button></td>
      </tr>
    </table>
    </div>
    )
}
import BgSilde1 from "./../(main)/TrangChu/bgsilde1";
import DeThiHot from "./../(main)/TrangChu/dethihot";
import GioiThieu from "./../(main)/TrangChu/gioithieu";
import TrangChu from "./../(main)/TrangChu/trangchu";
export default function Home() {
  return (
    <main className="container-main" style={{display:'flex', flexDirection:'column', gap:'0px'}}>
      <div>
        <BgSilde1 />
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:'50px'}}>
        <div>
          <TrangChu />
        </div>

        <div>
          <DeThiHot />
        </div>

        <div>
          <GioiThieu />
        </div>
      </div>

    </main>
  );
}

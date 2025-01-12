import HomeMain from "../components/top/HomeMain";
import Main from "../components/top/Main";
import HomeTopBar from "../components/top/HomeTopBar";
function Home() {
  return (
    <>
      <style>
        <title>大島情報局</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </style>
      <HomeTopBar />
      <HomeMain />
      <Main />
    </>
  );
}

export default Home;

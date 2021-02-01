import { useState, useCallback } from "react";
import Button from "./components/Button";
import { Search } from "heroicons-react";
import DarkModeToggle from "./components/DarkModeToggle";
import { toggleDarkMode } from "./services/dark-mode-service";
import { getSongs } from "./services/itunes-service";
import SongRow from "./components/SongRow";
import Player from "./components/Player";

const App = () => {
  const [searchedOnce, setSearchedOnce] = useState(false);
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playingSong, setPlayingSong] = useState({});

  const submitQuery = useCallback(async () => {
    setSearchedOnce(true);
    setIsLoading(true);
    if (!(query === "")) setSongs(await getSongs(query));
    setIsLoading(false);
  }, [query]);

  const _handleKeyDown = useCallback(async evt => {
    if (evt.key === "Enter") {
      await submitQuery();
    }
  }, [submitQuery]);

  return (
    <div className="container mx-auto p-4 sm:px-6 lg:px-8">
      <Player song={playingSong}/>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-blue-500 sm:text-3xl sm:truncate">ITUNES API</h1>
        <DarkModeToggle action={() => toggleDarkMode()}/>
      </div>
      <div className="flex mb-6">
        <div className="relative rounded-md shadow-sm w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400"/>
          </div>
          <input
            type="text"
            placeholder="Rechercher"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={_handleKeyDown}
            className="dark:text-white border-gray-300 dark:border-gray-700 dark:bg-gray-900 block w-full pl-10 sm:text-sm rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button action={() => submitQuery()} additionalClasses="ml-4">Rechercher</Button>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full mb-24">
                <thead>
                <tr>
                  <th className="pl-3 pr-0 py-0"/>
                  <th>Titre</th>
                  <th>Artiste</th>
                  <th>Album</th>
                  <th className="text-right pr-3">Dur.</th>
                </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-200 w-full">
                {
                  isLoading ?
                    <tr className="text-center">
                      <td colSpan={5}>
                        <div className="lds-ellipsis">
                          <div/>
                          <div/>
                          <div/>
                          <div/>
                        </div>
                      </td>
                    </tr> :
                    songs.length > 0 ?
                      songs.map((song, i) => <SongRow song={song} isPlaying={playingSong === song} onClick={() => setPlayingSong(song)}
                                                      key={i}/>) :
                      <tr className="text-center">
                        <td colSpan={5}>
                          {
                            searchedOnce ? "Aucun résultat" : "Effectuer une recherche pour afficher les résultats ici"
                          }
                        </td>
                      </tr>
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

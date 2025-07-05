import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BaseApi, makeGetRequest } from "../../config";
import { useTranslation } from "react-i18next";
import { IpaginateResponse } from "../../interfaces/IPaginate.interface";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { t } from "i18next";
import { humanReadable } from "./components/FeedBackTable";
interface AudioFile {
  id: number;
  file_name: string;
  file_path: string;
  name: string;
  phone: string;
  updated_date: string;
  created_date: string;
}
const AudioList = () => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number | null>(
    null
  );

  const [audioFiles, setaudioFiles] = useState<AudioFile[]>([]);
  const [page, setpage] = useState<number>(1);
  const [count, setcount] = useState<number>(2);
  const handlePlayPause = (audioUrl: string, index: number) => {
    console.log("Audio URL:", audioUrl);
    console.log("current Audio:", currentAudio);

    if (
      currentAudio &&
      currentAudio.src === BaseApi.base_url + "/" + audioUrl
    ) {
      if (isPlaying) {
        currentAudio.pause();
        setIsPlaying(!isPlaying);
      } else {
        currentAudio.play();
        setIsPlaying(!isPlaying);
      }
    } else {
      if (currentAudio) {
        currentAudio.pause();
      }
      const newAudio = new Audio(BaseApi.base_url + "/" + audioUrl);
      setCurrentAudio(newAudio);
      setCurrentAudioIndex(index);
      setIsPlaying(true);
      newAudio.play();
      newAudio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentAudioIndex(null); // Reset when the audio ends
      });
    }
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event.currentTarget);
    setpage(value);
  };

  useEffect(() => {
    makeGetRequest(`/audio_feedback/paginate?page=${page}`)
      .then((result) => {
        let data: IpaginateResponse = result.data;
        setpage(data.metadata.pagination.page);
        setaudioFiles(data.data);
        setcount(data.metadata.pagination.numberOfPages);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error Happended");
      });
  }, [page]);
  const { t } = useTranslation();

  return (
    <div className="main-page">
      <h2>Audio List</h2>

      {audioFiles.length > 0 ? (
        AudioFeedBackTable(
          audioFiles,
          currentAudio,
          isPlaying,
          currentAudioIndex,
          handlePlayPause
        )
      ) : (
        <p>No audio files available.</p>
      )}
      <div
        style={{
          marginTop: "30px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          page={page}
          onChange={handleChange}
          count={count}
          color="primary"
        />
      </div>
    </div>
  );
};

export default AudioList;

function AudioFeedBackTable(
  audioFiles: AudioFile[],
  currentAudio: HTMLAudioElement | null,
  isPlaying: boolean,
  currentAudioIndex: number | null,
  handlePlayPause: (audioUrl: string, index: number) => void
) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{t("no")}</TableCell>
            <TableCell>{t("name")}</TableCell>
            <TableCell>{t("phone")}</TableCell>
            <TableCell>{t("date")}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {audioFiles.map((audio: AudioFile, index: number) => (
            <TableRow
              key={audio.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{audio.id}</TableCell>
              <TableCell>{audio.name}</TableCell>
              <TableCell>{audio.phone}</TableCell>
              <TableCell>{humanReadable(audio.created_date)}</TableCell>
              <TableCell
                onClick={() => {
                  return handlePlayPause(audio.file_path, index);
                }}
              >
                <button
                  style={{
                    background:
                      isPlaying && currentAudioIndex === index
                        ? "#f00"
                        : "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {isPlaying && currentAudioIndex === index ? "Pause" : "Play"}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

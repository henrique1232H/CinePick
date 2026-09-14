import { getPaletteSync } from "colorthief"
import chroma from "chroma-js"


export const getColors = async (filmCorrect) => {
    const posterImage = new Image()
        posterImage.crossOrigin = "anonymous"
        posterImage.src = `https://image.tmdb.org/t/p/w500${filmCorrect.data.poster_path}`
        await posterImage.decode()

        const palette = getPaletteSync(posterImage, { colorCount: 6 })
        const hexColors = palette.map((color) => color.hex());

        if (hexColors.length === 0) return;
  
        const { darkest, lightest} = hexColors.slice(1).reduce(
          (result, color) => {
            const colorLuminance = chroma(color).luminance();
            const darkestLuminance = chroma(result.darkest).luminance();
            const lightestLuminance = chroma(result.lightest).luminance();
  
            return {
              darkest:
                colorLuminance < darkestLuminance ? color : result.darkest,
              lightest:
                colorLuminance > lightestLuminance ? color : result.lightest,
            };
          },
          { darkest: hexColors[0], lightest: hexColors[0] },
        );

        return [{hexColors: hexColors}, {darkest: darkest, lightest:lightest}]
}
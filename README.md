# LTC-SVS

[Open the listening page](https://xoymoron.github.io/LTC-SVS/) · [Download the poster QR code](./LTC-SVS-QR.png)

Minjun Kim · Yonsei University

This is the English listening page for *Adding Local Technique Control to a Pretrained Singing Voice Synthesis Model*. Select an add or remove request, a technique, a phrase, and a model. Compare the actual singing, the original SoulX-Singer output and the selected model. The interface includes synchronized mel views, target-region playback, per-phrase measurements, a singer reference and a randomized A/B comparison.

The listening panel contains 36 addition and 36 removal regions, plus one extra vibrato-removal example excluded from the evaluation statistics. Each region includes four guidance settings for each of the five model choices.

## Audio and attribution

Real singing and reference audio are from [GTSinger](https://github.com/AaronZ345/GTSinger) by Yu Zhang et al., *GTSinger: A Global Multi-Technique Singing Corpus with Realistic Music Scores for All Singing Tasks*, NeurIPS 2024. The listening copies include excerpting and matched playback gain. Syntheses were generated with [SoulX-Singer](https://github.com/Soul-AILab/SoulX-Singer) and its locally conditioned adaptations. GTSinger audio and adaptations are shared under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). See the [dataset license](https://huggingface.co/datasets/GTSinger/GTSinger/blob/main/dataset_license.md).

The page loads only the selected media. Identical WAVs share a file, and all audio and mel assets are byte-identical to their counterparts in the local listening panel.


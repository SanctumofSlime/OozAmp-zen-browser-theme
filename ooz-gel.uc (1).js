// OozAmp Gel for Zen: gooey tab drags (a Sine mod script).
// Pull a tab out of the sidebar and it stretches like taffy, a bead of goo
// carrying the OozAmp skull riding the strand; past the snap distance it
// breaks and the bead falls away as a droplet. Zen still does the real work
// (reordering, dropping into a new window); this only draws the goo.
//
// Cost: nothing while idle. While a tab is being pulled: one SVG path set and
// a few transforms per frame, on one overlay layer. No blur, no loops.
(() => {
  "use strict";
  if (window.__oozGel) {
    return;
  }
  window.__oozGel = true;
  if (document.documentElement?.getAttribute("zen-little-window") === "true") {
    return;
  }

  const HTML = "http://www.w3.org/1999/xhtml";
  const SVG = "http://www.w3.org/2000/svg";
  const SKULL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAmZ0lEQVR42u2dd5xW1Zn4v+ec+77v9D7DAIN0QQUbI4qixl2wpYFgi2ZVzG+zP2Iils+umpjNxsR1d0nZxLJRo5vCby1ZMcZgiw07QQFREBiqUmeYXt5yzzm/P86977wz804BsaRcPvczzJ1bznme5zz9eY6oOZJPwyEBEZx+r7+VAocBNcB4YBJwJFAe3B8DCoGngFeBBiAJ7Abe7PUuL8v7P9FDfMIIUIAFTK9rFwHTAkBPEYJhQghPIECI7G+y1v3AYq3FWhLAKuAt4OfAOiAeIFuGTwXftn9JCBAZANDBzzHAdCXl6QhxMnCsg6nBmDRsMhEler2P4G/hKkIIhBTSIcxaLHa9MfbHwN39jCkkBv3njADZi9ovklJcJoScqbUuyLiuA2AIQObl5YqqqmEUFxdTVVVJTU0NkUiEVCpFZ2cXzc3NxLu66OzqpLWllV27d9HW1m6Dd9gAuAgBkUhkMbDd9/08Y+wrwHqgsdcY7ce1Kj4uBIQU5gc8e6bneedp7S+03dM0o0bVmEmTJsvq6mo5evRoqqurKSsrpby8gtLSEpTyhvSxpsZGdu/ZTX19Pbt27mL1mjWsXfu22bevPo0MACUlxpp6a3kPeBl4GnghgxXqP3UEhOwmnMg0z/O+Yoz+h4C12OrqajN79ix55plniXHjxhKL5fT7MsfbDdb2JE4RyAWBQEiZ9dnOzg7q6upYs3qNfmPFCrtu3bu0trYpQCgpsdiQ3f0YuCVYFeqjlhEfJQIyKahUCL4thVykjQEwtbW19uKLL1LTp59Ibm5u9zIwOg1gIQSZglf0J4D7QVT4fyEEUqoe9+zbt5dXXn6Fn993n92zZ48BrFJKGKOVtawGvgqsyCAk+6eEgHDAEWCekvJWbcxYwE6ffoK9/PLL5fTpJ/YAegjooQL5QI/M1SOFTK+Uzs4OnnryKf77F79g586dAL6S0tPG+MCdwPVAKov8+tQiIKT8zwvBvwOTrYWSkhL/qquu8ubMmeMAYgwWixDyIwP6UBASroy21laefPJJfvmrX7J79x6jpBQWK4yxy4D5QNdHIRcONQIiQEpK8XUh5E+01gwbNsxMmTKFq6/+hhwxYmSfiX/SR+/xNDU2cs+99/DQQw9bwFdKRbTWLwGfA1oPNRJUUeUhm4sXLN8zjbG/sNaKkSNHmm9965vq8suvEIWFRWjtI6VCCPnpsUSFQAiJtRZjNHn5+ZxyykyqqqrExo0bVVtbmy+lGCuEOMdaXgTqg7maT9MK8ITAF0Jcb4y9tby83Dv7rLO49MtfFpWVlWke35+G8mk6QkQo5bFv315uv/12li17QgeUvx+YB7zYjxX/sSNAOHVa+BEv8s+JZPI711yzyM6ePZuqqmEiFLCfFnZzIIfWftruWLbs9yxZ8v90XV2dMkYnrOU24DuHwl74sCxICYG2luu11rdefPFF+qtf/QeRn18gjNGAQP4JUH1Wk11KrDFgLYcfPol58+bJVCppVq1aHVFSfsZaeyLwEtD8YVjSwSJAABEphS+luqmysuK2RVcv8q+44gplrRFYAl4v+FM+RKAW+76PlBIhpHj66aesNdYIweHAJcAaoC6DJX2kCAg9iVIIfCnV14HF1113nf/FOXMU1oo/B8BnWw3GaEaOrGH06DFi3bp1srW1VQOFQnAJ0AS8fjBIOFAEWMAKgYlEIguM0XctWLBAz507RwkhhaOSPy/gd68Gx5LGjx/PuHFjKSoqkm1tbaa5uUUopc611r4IbD1QdjRUIRx6CI8EPu953jTf9+eeddZZ6nu33GKFlCI0+f/cj8x5Ll/+Itdee50JPK37reXEAAlDFsxDXQGha+HXSqmvaq2PnDlzprz11lutVEpg7Z+Einmo5IJ1/ixGjx7NyTNmCKWkWb/+vQIpxSnW8gjQkUG0H3oFhC+qUVKu0cYUTp9+Av/5nz9Rnuf9RQG/z2owBiEl8Xic+fPn+/v27fWAF4yxZweu90E9qUNZARIwSsp/N9bMHDWqxvzwhz/yCgsL/6KBH64G3/dRSpJMJuSKFX9MSSHHW2sbgNeGIg/kUICfl5dbabEXSansD37wA5W2bv+Cgd+tIQmU8hhePZzRo0crbYyRUtyYn59fFgBffpgVIAFjLT/U2pzyzW9+08yYcbLMtBL/0o/QrzVx4kTmz58niooKzauvvlZotK621i4dTBYMhAAF6Py8vBMTicQdZ545m6997SqptS/+Cvzs8kAqxdSpR8utW7fous2bj4tFoxu01msHQkJ/QlgCprysLL+puakuEolWP/jgg2bkiBES+CvrGUBFDeSivXLBAta8/XayvKzsiP2NjdvpztwYVAaEqR3VzS0t/2WMrb7pphtNTU2NtNi/An8wFdURurj2umt1UVFhrLm5+Qoh+pcFsp9r2vO8m7XWl55zztmpz372c/JP1av58QtlhTGao46aoo4/fprRxnyjoqJiUmCYycEQIAEbiXgTjdGXFRcX+9dec61nrXUx278eByITxPz5840QFDfub7wxI89pUAQYa7nSGJu/YMEVlJaVib8UldOFJ7vPD7MKhJScdNJJasyYMVYbM6+goGBctlUge7OeWDQ60/f9hSNGDDdz585V1hx8/DaMLmnto7XvAvEZZ2YKyietwVhj0u7n8AzHfjDj1NoHEGeffbYGClKp1Gd7pWX2QEDo67G+1vcChZdddpnNy8sXxpqDcrIZo9P5OEp5KOUhpOxxhq7r0LfySYUfw/EkkwlSySTJZCIdyVPKO6hxhjCbOXOmkFJYP5WamS2E6WUgwESjkQnJZGp4eVmZnT17trTWHjD1W2Mw1qCURyIRZ9OmOtauXcu2rVvZsnVLt5GhPM48czZz58xFSOkC9hn5Oh9X3FcIxdtvr+G+++6nrq4OKQVaG/Lychk9egyTJk1iypQpnHjidKRUQx5naKCNHz9B1tTUiB073v/M8OHVJbt372nOTPTyeiXNng0UTT36aL+oqNgLnU0H6pxSSF5avpzb77iDzZs393v/ypUr+d3vfse111zL1KOP7vGOj9qdrJRHV1cXd955Bw8++GBmFnb62Lp1Gy+88AIARx89lUWLFnH00ccMaZxCCLT28TxPnHjiifb999+v6ujoOCLwEaXTNUNLWAJGSnmZteaEOXPmmKlTp0pjzZBiuiFFSaXYsmUz999/P4sX/4CmpiaEAKUUUkqkED1PKdmzZy9PPLGMxv2NFBTkUz18eJoff1Tey9bWFpYsWcK/3XYbL7/yCta6RF2wSNktA6SQ6XHv2bOXp59+mvb2NkaNGkVRUXE6VDlQ/MolnqGfeOJJobV5wxjzVkbOadoSloARgues5Yxf/vIX+sgjj1JD1f1Dqnr33XdY+H8X0tHZiZQikAV2UGdW5j0//elPmTFjBofa3xRaqSk/xQ033MDy5S9lZkgzmIxVUhLktTJx4gR+/OMfM2xY9YBZHyHCm5ub/Xnnnee1tLY+JAQXWtsdsAljvKaysqLcWo497LBRjBs3XmbysQEnFQjc+++7j6uuuoqOzk48z8MYOyjwQwSFq0RJyfXXXcfy5S+ilBdqEocM+AjB9ddfz/LlLxGJeI7fm8GBD6CNQQjwPI9Nm+pYsOBKHnroQaRU/QpnIV3CV0lJiaypqQE49qYbb4pkCmJVVBkuB3tuKuVfNm3aNH3OOefKofBiV8Fi+P73v8+vf72EZDKJEGAOQqtxqwh8X/PySy9z7LHHMmLEyA/NjsLUQyEkN998M88//wJKKXxfczAasDEGKQXt7e288sqrlJaUcNSUKf2O02VpC7Fl6xb7zjvvlL29Zs3vE4nEzjCAn4aw9vUEgMMPn2QBjDWDqplSKl555RUee+x3RCJeWA100IcxFiUlHZ2d3HjjjTQ1Nbmarw+hpoZ5n795+GGefPJJlFJo/eFSO8NxSin4yU9/QlNjo6P2LOMM2fMxxxyrARmPx2dmllaF0tjzfX8ewOjDDpOD5eK7lzq9+Y477gxUN82hsKm0MXieR0NDA0uWLHFL/CBT88NxdnS0c++99yKlSNcNHIpxCiHp6opz7733pgsE+7MHKisrAPB9f3y2eO9huKpElKfkUKhKCMGaNW+n1cyh8PsDSguUkocfeohNGzcihMvLORjqF0Jw5x13sr+xEYE4pOMMkfnc88/R1dXliKV39U7g/ikvr5BKKbQx02fNmhUKYSdllZRTtTEyFovpiRMm9nhwIOH7xhtvIARDynaWAdPLPAUDVJwKQUdnJw888MBByYDQiGxqauLxxx93smkQ6pcZBctDZUVCQH19A3V1dT2QkrEEACgtLRHFxUUAh7/++utFoSEWBljKHJbKbPXw4T0ezDrQAODr1693wBqE94hA7Otepx1gss6VActfWk5ba2tW6hpMRgE899yzgVqs+h2myBhjmMYgM6v5BnG8Abz33ns9iLM3C8rPL6CsrNwGfqGJ6ceDJX8cQGdnF/GursH5aqBe7d27t1/e1zuh6GgP/rkQbi2Eq/LgnBiUyv6RYK1DdFNTM8/84ZkeQB2qR1Jrn8d++5ijpX6gLzJqUmsUjJCQI7oJZqjHvn17BzQAAVFVVakBqbW+IMR7aOmUA84RlUp2Q2CQpT+YdhIyuqM9uLsEvF6cqsGHq1tho99PAZYQCAFvrnyT886bd0BFekIIWlta2bZtG9aCyZIdEg6nQsJ3CuH4CGgLLRa2afhNFzyfHFqF3kCL01iDQjJy5MhwAjPConAZsJQWgPKKckpKSgZlQeEyKywqGhJALsx1wE8aMAa0gZSBCg9Oig7AilzLAeob6hmKYdgbGvUN9cQTiX7V45DtXJ0PJ8acYyxHwDDlfv+PYhinulnSQMewqqpBhxWL5cgAfhMDond2gLGmAqCjo1MkE8nB456BdlFdXT2gwA5prkY5AHgZvNUL4LTFH5hyALZv205HR3vwbdvX+9qLNYXPba7bjNY6LbN6A18HAK+NOMJIZx9bRyQARbJvb4RsyK4cAgIycF4JHJO5CnMB2tpaaW5uHnxNBYfv+4Py/phwfDVTyIWCrkXDW6l+0gUyjrb2Ntrb2/uMK5RH/fliWttaB13NFQIKRN/GE0rAbg3v+YOPL2Tfgx3RaISM6Y/JREB5OKGUnxqy4IlFowPmsQsgaWFZIgg+SJAiOCWs96HDDi2LtTeyw4DP6tWreeSR/82qgcTj8QEJJPyZE4wpJJIUYIUbX9wOnPQfKiD5BfmDwisvLz/z8+UhAmLBkqCgoECUlpYNWQZMmDBhwHtD7eJHHXBpE/xXO/wxCXU+/DEBizsG1rlDPSCVSrFvX30fHT8ej3PLd7/L7bffju/7aRYVCutdu3b3z96Cyb9v4KY2WJsKqrEFRCUIC4/HBx6f83s5F/aomlE9VPSsq62iIvPXo8KAjBVCGGst48aOo7CwkAPJ9R/KbQK3lN/z4d5+EDWQzaGNob2tLc3fJZJ4IsF1117L9h07GDduLJ7X13UdPjMQEgCeTrhzvIIJHpRJ2OTDylS3rBh4fmJI4clAZqrAWPsbIM9z5UZSgqZm1Kj08h7IFx++cOy4cThPrxm0rEZmyAXTy/gZ+FlnbYYal9EGFfVYtuz3vLFiBUpKWlpaWfXWWxx3/PE9VmjVsKohl/YbYLN2J0NsEBGuuOrhw9MKSTaKDBFUWVmBlMIaY4UQxK0lIoFCrC0CmHLUUeJAElKPOeYYCgoK0ib5YNSmM4A/lALbMFhTVlbO5MmTnRzxXJzg0UcfdUEfIdi/fz//d+FC9u7dEwDFPX/yyadkdw/09j31sn7VEIu9QjjU1tYSiUbR2s/OOYJrZaVlFBYUhq/dAbTIWCwWM9bElFKMGTNmSF1JwpSN0tJSPvOZzyAEBxS8tweYeXzRhReSk5Pj+LyU7N69hw3vbQiCPhopXZ7+vr370oizxlA7bRrHHXdsOqI1qPuil6tkKPaGkpKw/0V/cAuvFxQUUFFZGXT0EmOAqEylkh9Yy1vl5WVMmTrVHJDBA1x4wQV8FKk9TsA5f9CsWbN6JEvt2LEdHQRGnKCWCAHvvPtud4zauoDSueec61boIQ70B55NpkyZwtSpUxksf8oGGoWnlA3Y0r60JQzsikSiRCIReyC+FmsMk484gku+9CW01umgDIeg6EEKibXw7Zu/zajDDgNr03HmzZu39LGMrYWGhoYeaS/WGObMncsll1wSVLKoQzK+MKiTn5fHt26+eVAnYajU+L5PV7wrvHkloGXwcFNrawv19fVDNsIyedvXv/ENTjvtVFIpPyPD4MAp3lWbKIyxaGP4/ve/x+e/8IU+1ThbM/KLeviW6ut7dtCSEmsN11xzDQsWXJEOGrksDXHAyJBSuOC81uTl5XLL925h7NixDFqqFcCzqamRffvqw68uB5DWgpRiVFtbO9u2bhWDeTez8TbP8/jB4h9w8cUXkZeXmw5gKyldsL332fu6dNRujEVrTVlZKYsXL+ass85Od1jJdP1u3bq1J6EEPzs6O7PKEWM0Cxd+jX/6x38kPz8frTXGOD9TCNSs4wzGlpnhoY3h5JNn8JOf/JTTTjv9gEq14vE4vu/LYGB7wy4nWGuVlILikuIh6bXZVDGE4LrrrueCCy7k3nvu4ffLlqEPIPwXiXiMGTOGs88+m3PP/SxhHVqoDqc9nK0t7NjxPtni1q2tLX1Yk8vxcezy/AsuYOapp/L000/x/PMv8P6OHbS0tg5JLVBKMXbsWL62cCGnnnYaB9KIxFiDtIK3315rfd8XSkqttd4N4AWwazLGkkgknbDDIuwQrKtApRGBu1Frn1GjRvEv3/0uF3/pS7y/YwcN+/cT7+piU92mNBXt3buHqsoqhlUPY/jwEVRWVjJ58mRGjhiRpqbek3MOQMWWLVtpbW3p4eEMV+y+ffXpXJzexqQI2g0MHz6cyy67nMsuu5ymxkY2b9lCZ2cHm+s2O+9pPE51dTXa1+Tm5TFx4gSEEIwYMZKRI4YTicYCN3yvtE07OKGuWbM6/KUN1+TDpSZ6nrchlfJZv26dnTp1qoubygNo2xEw8VDwAUyePDmtux9oPFhK1YeyQkG3dcuWNB8PsxtCO2TXrp2sWr2K44+flkZYNsXBBJkSpWVl1JY518tpp50+5EhbVqofgGlIpfB9n3XvrnOsxtr6EAEyQMA2gNvvukM0tTYilYdtSUFjCpp8aAzOdh86NMSNi1z41v3ft+53bdOZxjbpY1I+2vfRRmMy/jkjzKCNRvs+JkxdtzZImO1/NmHoL5vLwhjL7t27szrmMleCUp4zBo3BWDc2HfxL/9+4sZuUj0n43Q3/rMw+97hxsGnPgFeTj94XR8QF9993Hxs2bkQbgzbG/uzv/w+A8FauXClra2s9gAlV40jWdSDy8rAtCecSFFkcPzLw1wrcx2XGfZ4ATyDixoX8BRCTzhUqAv+0JxA5EnIkRIe2jEMn154gDNpHUwvG1tnRObgVKEh3aBRJA10GEhZ849y3FhcxSphuiywnA/ChGW8sREQQ27LBvbbb3A+0HBvVnHXY6eSe79kXV79sV216+5av3n2Pf955cyOi5ki4dt4/fG3q4cfePvXwYw3xuMQaUNIxKB18qGebJvdR33QjxWakOvi2p5Cwmc/YoExBuPsrIlDmQaE3qB7d1trK/PPPZ//+/X1ySsPczalTp3DfffcPbtG3BVTakHJzCFZwD3biie6/GRt2pe4mwPT1DAKUwd/9jHcZC5EoRHMsfsqi1HI6mm+uXXjmy2LPS89fTm7+XRgTtZ0dUkjZTdn7fShSUKAC+zyQDbuTkCuhPOKw7Vs32FYfUtZdF7j/R4W7f3cSJuRAieeuh77qcGLFnkNGkeeoKgvfDbqT9EiUzVwA1roYxdJHl1JVNaxvCnnKujE2pKDF7yaMRt+tzBKvm0ikcPf5Bqpj3YSlBMQ1tGo3z4hw71XCsZ8NXXBYDIZFA9+Gm19onUsEIjcfjG/xUwskxv6T9f0c3dneV5+t64LX22Bjl/toSBHNPrzZDmva3fVIQAFxA6va4c02JzsiwiGuSLmBrGiHuribpBc84wk3+BYNGzqhIdmHHYX8fNWqVf16HEMDMJFMUldXl9bmeryrIem+0aLdN8NzVwJea4W1HQ4x4ers0vBOJ6zMmA8BUNd3whut7lkVXM9RkCdhTQe80+FYWLS7668KaseId6YQEoz9J3X9FX83Q0RiR0vtm7QCbYPwVYnnKGBfCt4P0gNKPIfdYs9d35pwrKrIc4AuiTjK2Rp3EynzXIRjeMyFnrbGgxUUrCzTi63FFJR6PVhByEruuvMu6uvrswbZhXDahrUGKSRn/M3fpFMT0+9q8B2/j8gMBAsoUe4FjT5sT7jsgWIPKiNuVbZqR4wp664XKHe9Xbv5dxm3GmICKqNQGoGdCdiWcIgszsJeI1GJn3xK7HnhDyOR3jt4XgmppI8QXobkcywnbmBXErbFIV/CUflQqNyS3J6ALV2Qr2BCrhu0trA3Be91usEenut4vIfTFOq6HPJGRGFyvmNDJpAbY2JQ1Z0qEbKRXbt2Mn/+fFKpFNbCsGHD6OrqpLW1rQ9CSkpKWLp0KQUFBd2GpQD2JR1QyFAcbLoJmwNwfRI2x90Lj8x38zHA3qSbjwTG5sLImPtYsw/rO9xKn5zrgO8JB5utcfgg4WB1dL67rq1PNOrh+80Yf4qsXThrJ5hLkQpy8jyssVjrY622vjY2abARsONzYHqBo55mv9uJPi4HTipy1L++0/FYIaAmCrUFbpLb4+7mpHXL9JgCOKHQPZMw7p7cAFFVPfNUQmt31apVJJOptGU8edKkHhZ7SUkJpaUlFBcX09zczJNPPJHO4EgDuirqvpGrumWCsd1yTOIAe2KRo/DGYJ6+heoozCiCmhxHcHsS7r1lHkwrdKtoSxxSBqsd+7MTczDTCyzDIhptfay15OZ5SAWYS2sXztqpNv78NlW76Msb/n72ha8h5UQ8bxQ5+ZJoVArlCSGFFQghfIuNAiOiiEzWoa1jMZVRqIoEyzsAdlS6gZdHnEpLMOGUdWpddcxR2GExqIm5a72MGhuUST3yyCOsW7cOsEQiEQ4/fBLvvvtuEIq0XHLJpfh+CmMMLS3NbNi4gS984fPk5OT2tIpzpGOhJZ4bq2+7VU+bIWgrIlAcyC6boW6XR9ycQiTqQAGpjmGHeQjP9c0TUiFkxIj8HMmwAkksR2KtwOjXiXdcWbtw1pMrb7tNebU33KADW+Bp4OmVP395ho13XKB9f1Rja+Px2uixhbkFOi+Wq2QkB5Ip56pQIsws7QZYgXKDD9U0TzghlO+5rtJhJLwrGHSxcpPqraNn0f83b65LW73V1dXpNJAwW+L000+no6OdN1e+SWFhIfX1DaxevTrtMEuHWMNv5Cl3joh1a2+5onuMSQud2m0H5JtuPV9bJ2jTQWX3jEn5yEgMrEH7KboScd3W1a6SqdS+0cNqXrBS7hJKPVT7lVNfCwoUZW1trfaCkJpZedttqvaGG3TtlTNfw1XyARTForEH8nNyzynIKfBHHzbau/V73yenMA9jLTKi+prhcgiOvIIs4THRF/ih+vn8c8+xevXqdDhy2rRptLW5PKHhw6spKipmwoQJXHjhRTz228fSOURr1rzd18Ugen1XBopFtqMsks2z1mfsJqWROR676z7gpm/dREtra6q9qz3SEe96OZFKXBH0FU0fK2+7TdXW1uo+7WpWguC22ySls8TSpx4Rty69NWUtk3A7SpwP+PMumC9v/McbZDo3R8rs3lN7AH6kgSrYsfzLd/6FZU8sw/M8UimfO++8g6KiYrZv38app56KlIpYNIqQkqVLl/LII/9LPB6nsLCQ++67f/DS14Mcq8W5zz3l8caK1/n3xf9htm/ZHpqkW4EThaD+prk3ReaedZ6l6Q+WG24wtZk62CBN+6QQmL/921nqueeefVkKdZKvfU455RRz4w03iurh1R9Zf+jMKNK5555DY2MTAMcddyx33fVffdJQMnfdsMYQTyTYu3dvOs79UWwEEbK1bVu36QsvvABtjFJSYa15xYt4f5dKpbZkVkR+2K6JxcACJeU12piawsICzj//fLNgwZUyJycnnZ/5UbS0+eOKFSSSSYqLHavJzc3tsQHEgWxvcqj2GQh239C/+c1v5JJfLxGNTY1IIeu0MTcCv+ln16iDbtyamSJTHol4l6ZS/iJgzPhx47h60dXm5JNPkT1cyh9T24GBMvcOVVfH3it8xYo3zOuvv26f/cOzaueuXQAvSSn+2xj7MNCWRdIckvb1mVtRRT3Pm2qt/Wet9bmA+vKXL9UnzzhZ1p5wggip8VBtU5KZ/fxxb3mS6Qh85g/P8Nhjv+Odd94J//x0Tk7ODxOJ+FMZhuABtbM/mP0DREYOU0QpdbUx+ghruRTgiCMm6xkzZsjTTjtdTJkypXf7FsLd7T4tbY4HSsMM/3b33T9j6dKl1Nc32CA4vyoajd2RTCbuCzyyIoPd2I+jfb0NsJyy1r4MvOB5Xom15tj6+gZv1arV4rHHfmvffPMtk5+fLw87bFTQ9kWm+zAMRvHGmCCjzQ4pTylTCA+qWVnjvOSD9MIIC7wfeOAB3n13HdFoRFtrlTH2Z77v/9haIhkZlvaT2MAhlA1dxpjHgaeUlDlSyhJjTMmuXbvkM888w4svvsD+/Q28v2NHgADIy8vrl/pE2CTD9ew/oF7/Q90zJvzpegNZlFL91hkXFhTw1FNPYowRAcVPA34P7DnAZD+ybbzzoVZwL7a0Qhvzd0CFkvIkIeXfGqOv3rSpTmza1G2L3HPPPZSXV/SpQwsR8tBDD7J37z7KykrJy8tn7ty5g8aRfd8nEokM2jjj1Vdf4dk/PEvD/v0IIaiqqmTRokV4SvUR2KF9M2bMmHCHVhHsGFKE23B0bWbnk08CAb1ZUjiDBm3M4xhTE2wVaKSSMhbLYc6cORx33HHp6pZsVPfAAw+kU09qamqY88UvZpUboXby0ksvs3jxYmLRKFcsWMDnPve5PppLWCi3YcNGfvvYY+nrJ5xQS15efrDRUJZmG8ZQXV3NGWecwfPPP+/S5V3mQQ6HaHfTQ3mEFUghYi8O4er7PlOnTmHRokVZG1uE1N/dKsyd+/c30NTclL0+LPi9vb2dPXv2sH3HjnRWXn/1upMmHY5SikjEQ0nJqlWrWfXWW/12PQl7pc6bN8+l4jvHtwzsok8dAshQVb8MnBIgRFkLZ5xxRjothAFKkeLxOFprtNaMGzuOWCw2YP5lTk5OOq1xxMgRAwpjt5+Ze7exBq19Ors6B945w1qOPPIoRo2qscZYJaVIhjVeH3Ybq0ONgLD5x3HAzwCppBTaGE44oZa5c+YOai3H43G6MorFr/zKleTnF6QrM7NRdVlZaTpAH+7G2ts/Ff5eWlqa7mcUVs+3tLSkY7b9VYUWFhYydepUC6Ryc3LnA1cdiv0l5UewiWe4Q3aulMJoY0ReXi633PK9NM8fSFvxfR8/1V0o2NHeMWgfzxBhWmuSyUT26v0MZIWRsvBwvSREv/Vd4fdnzpwZLAr5QXb/7SePAB0M6nfBfu5KSWkWLVpERUXFgImsYRVLU1Mz8Xg8zcuVpwatzRo+fHj6/v4K80IZkpeX3+2gC5pErVm9hp07P4B+WlPKQG0dP368EYJIR0f7ZYO0uvhEZQDBJphNxljGjhtnzztv3tAKGIBNQfZYCPhEPNG/pRpQeSbL2rJlc7+ZcaFLY9y4selVIaUikUzy0EMPZzbfzvqduro6GdgbJ/faqPpTJQNsLBYbYYyeFo1GuPjii+SBdLzasHFjjxZmW7dtZdeunUHBRnYt6LXXXk/nCb34woskEvHsvXsCRCYyugGEVTiPP/44jY37szYFCd+jtZbGWCsQxwJHMLQuBh+/DPB9fxRQnJOTY488srvwL8z/zEadIf8N++4Y7YTuL3/5KzZt2hQ0d83eQjhd3Y8rmI7FciCLlS1wvTw/+OCDNNuzwa5/LS0t/OpXv0onBoctEFzbYoeUDRs2hmzWA049FDCUhxj4BijVWv9MCmlbW9vsc8896/i+cLuphi6DcILpvtJYUqlUNwvBdWwXwiHHBq3MwoaoIWAyEaqUYvv2HS6BSwhSqVS6Z3Uof3bv3sM7a9dmUravtTZSCpYsWcKPfvQjPvjgg3QLBCkVnufaF2/YsCFTzp30abMDwsDNTOAYizWAfPTRR9m58wO01mzcuIHOzo40MDL7SkupWL1qFQ0NDVYItHE6obUWfr9sGUJK9u3bmw6wh4ARQhCPxy1gpRS0tLRwzz13AxCJRNI9q8P+QTk5OeS4PexDB5oHSGOsb621S5YsYcGCK/jKV77Cv956K88++wfWrl3Lc889a7Zu2WKBmLGmAXjsUOw1fyh31PYCA+xiYElogIU9JYZVD2PXrt2Ul5VRWFRERUWFraqqtMOGDeOII44QTU1NdvHixSYej3u9kp99QMyfP1++9uqroqKykgnjxzNr1izGjB1ri4uLzM03f1s9++yzKKW0MZpYLEfMmTNHTpw4Ad/3Of644ymvKKeoqJjGxv3285/7vEkkkypI6Pq3QG2+MEjy9bUxqpezUWdY9z8F/hXY/WlDQGiUjAXeDXpQCCEQYX9XuhO3B2rN1ga8AZQAxwdx6RAhOtMBmJ+fr/Lz82hpad2dSCSiYQOMDP+UCcYgKyoqzOzZs8369eu91atXYy1vAd8OvJr5wA3A14HikO0hhMVaYVy643bgq9qYp4Yabvwk9pQPo0G3A1/DZdUo1ypa9NhvUiA6EGI/ILC21GK3Aw8aY/8H2AycAUwOrOrJSqkjrDXlLs1QBE1jbRPwP8C/AVHg6oAAKpWU0zNaTGbq7PXAtcADweoKVy7AZ4HzgC9mILM9uPc7wE66k/btp2lL8z7bHgJPBwBMa5jAC8CrwEZge7ANrASKAsDoAdo0DAc+A1QBhcCOnJycZ5LJxO7AVdybEGbhNh+9SgjGAWujkejDFRUVd+/ctWtvL4LJDLeGlnxN8LedQVuBD7179seBgEzgVQA3BgD7X+ApoGsIcsT02oFusIhTtrYOmayhAjg5YDW6V38O249SYvr5xiHfaeL/A0ITRSQyyWt0AAAAAElFTkSuQmCC";
  const DROPS = ["M0.1,-6C1.4,-1.8 4.6,2.8 4.6,5.6A4.6,4.2 0 0 1 -4.6,5.5C-4.6,3.2 -1.9,-2.4 0.6,-6Z", "M0.4,-6C1.6,-1.8 5.0,1.8 5.0,6.1A5.0,4.6 0 0 1 -5.0,6.4C-5.0,2.5 -1.3,-1.7 -0.5,-6Z", "M0.1,-6C1.4,-2.8 5.4,3.2 5.4,6.0A5.4,5.0 0 0 1 -5.4,6.2C-5.4,3.3 -1.3,-1.3 -0.1,-6Z", "M-0.1,-6C2.1,-1.4 5.5,1.7 5.5,5.6A5.5,5.0 0 0 1 -5.5,5.7C-5.5,3.4 -1.7,-1.8 -0.2,-6Z", "M-0.1,-6C1.4,-1.9 5.0,2.7 5.0,6.4A5.0,4.6 0 0 1 -5.0,6.2C-5.0,3.4 -1.2,-1.2 0.2,-6Z", "M0.4,-6C2.2,-1.4 4.5,2.6 4.5,6.2A4.5,4.1 0 0 1 -4.5,5.7C-4.5,3.2 -1.5,-2.3 -0.5,-6Z"];
  const DEBUG = () => pref("mod.oozamp.debug", false);
  const log = (...a) => DEBUG() && console.log("[OozAmp Gel]", ...a);
  console.info("[OozAmp Gel] script 1.0.3 loaded");

  // ---------------------------------------------------------------- settings
  function pref(name, fallback) {
    try {
      const P = Services.prefs;
      switch (P.getPrefType(name)) {
        case P.PREF_BOOL: return P.getBoolPref(name);
        case P.PREF_INT: return P.getIntPref(name);
        case P.PREF_STRING: return P.getStringPref(name);
      }
    } catch (e) {
      /* no such setting yet: use the default */
    }
    return fallback;
  }
  const settings = () => ({
    on: !pref("mod.oozamp.no_taffy", false),
    snap: Math.min(400, Math.max(50, parseInt(pref("mod.oozamp.snap_distance", "120"), 10) || 120)),
    skull: String(pref("mod.oozamp.skull_ride", "always")),
  });
  const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------------------------------- overlay layer
  let layer = null;
  let svg = null;
  function ensureLayer() {
    if (layer?.isConnected) {
      return;
    }
    layer = document.createElementNS(HTML, "div");
    layer.id = "ooz-goo-layer";
    layer.setAttribute("style", "position:fixed;inset:0;pointer-events:none;z-index:2147483000;overflow:hidden;");
    svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("style", "position:fixed;inset:0;width:100vw;height:100vh;overflow:visible;pointer-events:none;");
    layer.appendChild(svg);
    document.documentElement.appendChild(layer);
  }
  const cssVar = (name, fallback) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

  // a blank picture for the system drag image while we draw our own blob
  let blank = null;
  function blankImage() {
    if (!blank?.isConnected) {
      blank = document.createElementNS(HTML, "div");
      blank.setAttribute("style", "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;");
      document.documentElement.appendChild(blank);
    }
    return blank;
  }
  for (const name of ["setDragImage", "updateDragImage"]) {
    const original = DataTransfer.prototype[name];
    if (typeof original !== "function") {
      continue;
    }
    DataTransfer.prototype[name] = function (node, x, y) {
      if (drag && !drag.done) {
        return original.call(this, blankImage(), 0, 0);
      }
      return original.call(this, node, x, y);
    };
  }

  // ---------------------------------------------------------------- shapes
  const f1 = (n) => n.toFixed(1);
  function neckPath(ax, ay, bx, by, wa, wb, h) {
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    const mx = (ax + bx) / 2, my = (ay + by) / 2, k = 2 * h - (wa + wb) / 4;
    return `M${f1(ax + nx * wa / 2)},${f1(ay + ny * wa / 2)}Q${f1(mx + nx * k)},${f1(my + ny * k)} ${f1(bx + nx * wb / 2)},${f1(by + ny * wb / 2)}` +
      `L${f1(bx - nx * wb / 2)},${f1(by - ny * wb / 2)}Q${f1(mx - nx * k)},${f1(my - ny * k)} ${f1(ax - nx * wa / 2)},${f1(ay - ny * wa / 2)}Z`;
  }
  const circle = (x, y, r) => `M${f1(x - r)},${f1(y)}a${f1(r)},${f1(r)} 0 1 0 ${f1(2 * r)},0a${f1(r)},${f1(r)} 0 1 0 ${f1(-2 * r)},0Z`;
  function makePaths(fill, rim) {
    const mk = (stroke) => {
      const p = document.createElementNS(SVG, "path");
      p.setAttribute("fill", fill);
      if (stroke) {
        p.setAttribute("stroke", rim);
        p.setAttribute("stroke-width", "3");
        p.setAttribute("stroke-linejoin", "round");
      }
      svg.appendChild(p);
      return p;
    };
    // outlines underneath, fills on top: one merged outline around neck + bead
    const o = { neckO: mk(true), beadO: mk(true), neck: mk(false), bead: mk(false) };
    o.set = (neck, bead) => {
      o.neckO.setAttribute("d", neck); o.neck.setAttribute("d", neck);
      o.beadO.setAttribute("d", bead); o.bead.setAttribute("d", bead);
    };
    o.remove = () => [o.neckO, o.beadO, o.neck, o.bead].forEach((p) => p.remove());
    return o;
  }

  function droplet(x, y, color, fall, withSkull) {
    ensureLayer();
    const d = document.createElementNS(HTML, "div");
    d.className = "ooz-drop" + (withSkull ? " big" : "");
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    const inner = document.createElementNS(HTML, "div");
    inner.style.setProperty("--fall", `${fall}px`);
    inner.style.rotate = `${(Math.random() * 20 - 10).toFixed(0)}deg`;
    const s = document.createElementNS(SVG, "svg");
    s.setAttribute("viewBox", "-7 -6 14 18");
    const p = document.createElementNS(SVG, "path");
    p.setAttribute("d", DROPS[Math.floor(Math.random() * DROPS.length)]);
    p.setAttribute("fill", color);
    s.appendChild(p);
    inner.appendChild(s);
    if (withSkull) {
      const img = document.createElementNS(HTML, "img");
      img.src = SKULL;
      img.style.rotate = `${(Math.random() * 40 - 20).toFixed(0)}deg`;
      inner.appendChild(img);
    }
    d.appendChild(inner);
    layer.appendChild(d);
    // short-lived: it lands, then fades, so it never sits over text for long
    setTimeout(() => (d.style.opacity = "0"), 1100);
    setTimeout(() => d.remove(), 1700);
  }

  function pulse(el, attr, ms = 600) {
    if (!el) {
      return;
    }
    el.removeAttribute(attr);
    void el.getBoundingClientRect();
    el.setAttribute(attr, "true");
    setTimeout(() => el.removeAttribute(attr), ms);
  }

  // ---------------------------------------------------------------- the drag
  let drag = null;

  const tabFrom = (event) => {
    for (const start of [event.explicitOriginalTarget, event.originalTarget, event.target]) {
      let node = start;
      while (node) {
        if (node.classList?.contains("tabbrowser-tab")) {
          return node;
        }
        node = node.parentElement || node.getRootNode?.()?.host;
      }
    }
    return null;
  };
  // Screen coordinates first: drag events coming up from the page (a remote browser)
  // can carry clientX/Y measured from the page's corner, which made the blob jump
  // to the left edge of the window. Screen minus window position is always right.
  const pointOf = (e) => (e.screenX || e.screenY)
    ? { x: e.screenX - window.mozInnerScreenX, y: e.screenY - window.mozInnerScreenY }
    : { x: e.clientX || 0, y: e.clientY || 0 };
  const sidebarBox = () => document.getElementById("navigator-toolbox")?.getBoundingClientRect();

  function begin(event) {
    const S = settings();
    if (!S.on || reducedMotion()) {
      return;
    }
    const tab = tabFrom(event);
    if (!tab || tab.hasAttribute("zen-essential") || tab.hasAttribute("zen-glance-tab") || tab.hasAttribute("pinned")) {
      return;
    }
    if (window.gBrowser?.selectedTabs?.length > 1 && tab.hasAttribute("multiselected")) {
      return; // several tabs at once: leave it to Zen
    }
    ensureLayer();
    const p = pointOf(event);
    const box = tab.getBoundingClientRect();
    const selected = tab.hasAttribute("selected");
    const fill = cssVar(selected ? "--ooz-sel" : "--ooz-tab", selected ? "#CCFF00" : "#3a6c00");
    const ghost = document.createElementNS(HTML, "div");
    ghost.className = "ooz-ghost";
    if (selected) {
      ghost.setAttribute("selected", "true");
    }
    ghost.style.setProperty("--ooz-ghost-fill", fill);
    ghost.style.width = `${Math.min(260, box.width)}px`;
    ghost.style.height = `${box.height}px`;
    ghost.style.opacity = "0";
    const icon = tab.querySelector(".tab-icon-image")?.src || tab.getAttribute("image");
    if (icon) {
      const img = document.createElementNS(HTML, "img");
      img.src = icon;
      ghost.appendChild(img);
    }
    const label = document.createElementNS(HTML, "span");
    label.textContent = tab.label || tab.getAttribute("label") || "";
    ghost.appendChild(label);
    layer.appendChild(ghost);
    const skull = document.createElementNS(HTML, "img");
    skull.className = "ooz-skull";
    skull.src = SKULL;
    layer.appendChild(skull);
    const ride = S.skull === "always" || (S.skull === "sometimes" && Math.random() < 0.34);
    drag = {
      tab, ghost, skull, ride, fill, S,
      rim: cssVar("--ooz-taffy-rim", "rgba(204,255,0,.7)"),
      drop: cssVar("--ooz-drop", "#CCFF00"),
      paths: null,
      p, c: { ...p },
      offset: { x: p.x - (box.left + Math.min(260, box.width) / 2), y: p.y - (box.top + box.height / 2) },
      w: Math.min(260, box.width), h: box.height,
      snapped: false, away: false, done: false, t: 0, len: 0,
      skullRot: Math.random() * 50 - 25,
      lastOver: Date.now(), last: performance.now(), raf: 0,
    };
    drag.paths = makePaths(fill, drag.rim);
    log("drag start", label.textContent);
    drag.raf = requestAnimationFrame(frame);
  }

  function onOver(event) {
    if (!drag || drag.done) {
      return;
    }
    const p = pointOf(event);
    if (p.x || p.y) {
      drag.p = p;
      drag.lastOver = Date.now();
    }
  }

  // nearest point on a box to a point, pulled a little inside
  function anchorOn(r, p, inset = 6) {
    return {
      x: Math.min(Math.max(p.x, r.left + inset), r.right - inset),
      y: Math.min(Math.max(p.y, r.top + inset), r.bottom - inset),
    };
  }

  function frame(now) {
    if (!drag || drag.done) {
      return;
    }
    const d = drag;
    const dt = Math.min(64, now - d.last);
    d.last = now;
    // goo has a little lag: ease toward the pointer
    const k = 1 - Math.pow(0.6, dt / 16.7);
    d.c.x += (d.p.x - d.c.x) * k;
    d.c.y += (d.p.y - d.c.y) * k;

    const tabBox = d.tab.isConnected ? d.tab.getBoundingClientRect() : null;
    const side = sidebarBox();
    // only stretch once the pointer is clearly out over the page, not just near the edge
    d.away = !!side && !!tabBox && (d.p.x > side.right + 10 || d.p.x < side.left - 10);
    const gx = d.c.x - d.offset.x, gy = d.c.y - d.offset.y;   // ghost centre

    if (!d.away || !tabBox) {
      // inside the sidebar: no stretch, but the blob still follows the pointer
      // (Zen only opens a gap, and the system drag image is blanked)
      d.paths.set("", "");
      d.skull.style.opacity = "0";
      if (tabBox) {
        d.ghost.style.opacity = "1";
        d.ghost.style.transform = `translate(${f1(gx - d.w / 2)}px,${f1(gy - d.h / 2)}px)`;
      } else {
        d.ghost.style.opacity = "0";
      }
      if (d.snapped) {
        d.snapped = false;           // back home: it can stretch again
        pulse(d.tab, "ooz-plop");
      }
      d.raf = requestAnimationFrame(frame);
      return;
    }

    d.ghost.style.opacity = "1";
    d.ghost.style.transform = `translate(${f1(gx - d.w / 2)}px,${f1(gy - d.h / 2)}px)`;
    if (d.snapped) {
      d.paths.set("", "");
      d.skull.style.opacity = "0";
      d.raf = requestAnimationFrame(frame);
      return;
    }

    const a = anchorOn(tabBox, { x: gx, y: gy });
    const ghostBox = { left: gx - d.w / 2, right: gx + d.w / 2, top: gy - d.h / 2, bottom: gy + d.h / 2 };
    const b = anchorOn(ghostBox, a);
    const dist = Math.hypot(b.x - a.x, b.y - a.y);
    const t = Math.min(1, dist / d.S.snap);
    d.t = t;
    d.len = dist;
    const wa = d.h * (0.8 - 0.32 * t), wb = d.h * (0.8 - 0.3 * t), h = 1.2 + 11 * Math.pow(1 - t, 0.85);
    const neck = neckPath(a.x, a.y, b.x, b.y, wa, wb, h);
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const rb = d.ride ? Math.max(0, Math.min(8.5, dist * 0.24)) : 0;
    d.paths.set(neck, rb > 0.5 ? circle(mx, my, rb) : "");
    if (d.ride) {
      const sz = rb / 8.5;
      d.skull.style.opacity = String(Math.max(0, Math.min(1, (dist - 16) / 22)) * 0.95);
      d.skull.style.transform = `translate(${f1(mx - 7.5)}px,${f1(my - 7.5)}px) rotate(${d.skullRot.toFixed(0)}deg) scale(${sz.toFixed(2)})`;
    }
    d.mid = { x: mx, y: my };
    if (dist >= d.S.snap) {
      snap();
    }
    d.raf = requestAnimationFrame(frame);
  }

  function snap() {
    const d = drag;
    d.snapped = true;
    d.paths.set("", "");
    d.skull.style.opacity = "0";
    droplet(d.mid.x, d.mid.y, d.drop, 26 + Math.random() * 30, d.ride && d.len > 30);
    pulse(d.tab, "ooz-recoil");
    d.ghost.classList.remove("ooz-recoil");
    void d.ghost.offsetWidth;
    d.ghost.classList.add("ooz-recoil");
    log("snap");
  }

  function end() {
    if (!drag || drag.done) {
      return;
    }
    const d = drag;
    d.done = true;
    cancelAnimationFrame(d.raf);
    const finish = () => {
      d.paths.remove();
      d.ghost.remove();
      d.skull.remove();
      if (drag === d) {
        drag = null;
      }
    };
    // restick the necks round the tab once Zen has put it down
    setTimeout(() => {
      if (d.tab.isConnected) {
        pulse(d.tab, "ooz-plop");
        pulse(d.tab, "ooz-restick", 450);
        pulse(d.tab.previousElementSibling, "ooz-restick", 450);
      }
    }, 30);
    if (!d.away || d.snapped || !d.tab.isConnected) {
      d.ghost.style.opacity = "0";
      setTimeout(finish, 200);
      return;
    }
    // let go while still stuck: the strand pulls the blob back and shrinks away
    const start = performance.now();
    const from = { x: d.c.x, y: d.c.y };
    const box = d.tab.getBoundingClientRect();
    const home = { x: box.left + box.width / 2 + d.offset.x, y: box.top + box.height / 2 + d.offset.y };
    const step = (now) => {
      const k = Math.min(1, (now - start) / 220), e = 1 - Math.pow(1 - k, 3);
      d.c.x = from.x + (home.x - from.x) * e;
      d.c.y = from.y + (home.y - from.y) * e;
      const gx = d.c.x - d.offset.x, gy = d.c.y - d.offset.y;
      d.ghost.style.transform = `translate(${f1(gx - d.w / 2)}px,${f1(gy - d.h / 2)}px) scale(${(1 - 0.5 * e).toFixed(2)})`;
      d.ghost.style.opacity = String(1 - e);
      const a = anchorOn(box, { x: gx, y: gy });
      const g = { left: gx - d.w / 2, right: gx + d.w / 2, top: gy - d.h / 2, bottom: gy + d.h / 2 };
      const b = anchorOn(g, a);
      const t = d.t * (1 - e);
      d.paths.set(neckPath(a.x, a.y, b.x, b.y, d.h * (0.8 - 0.32 * t), d.h * (0.8 - 0.3 * t), 1.2 + 11 * Math.pow(1 - t, 0.85)), "");
      d.skull.style.opacity = "0";
      if (k < 1) {
        requestAnimationFrame(step);
      } else {
        finish();
      }
    };
    requestAnimationFrame(step);
  }

  window.addEventListener("dragstart", (e) => {
    try {
      if (drag) {
        end();
      }
      begin(e);
    } catch (err) {
      console.error("[OozAmp Gel] drag start", err);
      drag = null;
    }
  }, true);
  window.addEventListener("dragover", onOver, true);
  window.addEventListener("drop", end, true);
  window.addEventListener("dragend", end, true);
  // the pointer left the window mid-drag (heading for a new window): let it snap
  window.addEventListener("dragleave", (e) => {
    if (drag && !drag.done && !e.relatedTarget && !drag.snapped && drag.away) {
      drag.mid = drag.mid || { ...drag.c };
      snap();
    }
  }, true);
  // safety net: a drag that ended without telling us
  window.addEventListener("mousemove", (e) => {
    if (drag && !drag.done && e.buttons === 0 && Date.now() - drag.lastOver > 400) {
      end();
    }
  }, true);
  window.addEventListener("unload", () => layer?.remove(), { once: true });
})();

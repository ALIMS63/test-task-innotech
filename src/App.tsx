import { FC, useEffect, useState, ChangeEvent } from 'react';
import { Input } from './components/Input';
import { Dropdown } from './components/Dropdown';
import GlobalStyle from './globalStyles';
import {
    Container,
    ContentWrapper,
    FromToArrow,
    InnerBlock,
    Title, Page
} from './styled';
import { useDebounce } from './helpers/useDebounce';

interface Rates {
    [key: string]: number;
}

const App: FC = () => {
    const [fromSum, setFromSum] = useState<string>('');
    const [toSum, setToSum] = useState<string>('');

    const [fromCurrency, setFromCurrency] = useState<string>('');
    const [toCurrency, setToCurrency] = useState<string>('');

    const [rates, setRates] = useState<Rates>({});

    const debouncedFromSum = useDebounce<string>(fromSum, 500)
    const debouncedToSum = useDebounce<string>(toSum, 500)

    const getData = async () => {
        try {
            const response = await fetch("https://api.exchangerate.host/latest");
            const json = await response.json();
            console.log('json:', json);
            setFromCurrency(json.base);
            setRates(json.rates);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const intervalCall = setInterval(() => {
            getData();
        }, 60000); // Каждую минуту выполняем новый запрос на обновление данных

        return () => {
            clearInterval(intervalCall);
        };
    }, []);

    const handleFromCurrencyChange = (value: string) => {
        setToSum(String(rates[value] / rates[toCurrency]));
        setFromCurrency(value);
    }

    const handleToCurrencyChange = (value: string) => {
        setToSum(String(+fromSum * rates[value]));
        setToCurrency(value);
    }

    const handleFromSumChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(111, fromSum);
        const value = e.target.value.replaceAll(',', '').replace(/[^\d.-]+/g, '');
        if (value.length > 1 && value[0] === '0') return;
        setFromSum(value);
    }

    const handleToSumChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replaceAll(',', '').replace(/[^\d.-]+/g, '');
        if (value.length > 1 && value[0] === '0') return;
        setToSum(value);
    }

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            setToSum(String(+fromSum * rates[toCurrency]));
        }
    }, [debouncedFromSum])

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            setFromSum(String(+toSum / rates[toCurrency]));
        }
    }, [debouncedToSum])

    return (
        <>
            <GlobalStyle />
            <Page>
                <Container>
                    <Title>Конвертация</Title>
                    <ContentWrapper>
                        <InnerBlock>
                            <Dropdown
                                placeholder="Исходная валюта не выбрана"
                                options={Object.keys(rates)}
                                selectedOption={fromCurrency}
                                setSelectedOption={handleFromCurrencyChange}
                            />
                            <Input
                                required
                                placeholder="0.0"
                                name="fromSum"
                                value={
                                    fromSum.split('.').length > 1
                                        ? `${fromSum.split('.')[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')}.${fromSum.split('.')[1]
                                        }`
                                        : `${fromSum.replace(/(\d)(?=(\d{3})+$)/g, '$1,')}`
                                }
                                onChange={handleFromSumChange}
                            />
                        </InnerBlock>

                        <FromToArrow />

                        <InnerBlock>
                            <Dropdown
                                placeholder="Валюта конвертации не выбрана"
                                options={Object.keys(rates)}
                                selectedOption={toCurrency}
                                setSelectedOption={handleToCurrencyChange}
                            />
                            <Input
                                required
                                placeholder='0.0'
                                name="toSum"
                                value={
                                    toSum.split('.').length > 1
                                        ? `${toSum.split('.')[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')}.${toSum.split('.')[1]
                                        }`
                                        : `${toSum.replace(/(\d)(?=(\d{3})+$)/g, '$1,')}`
                                }
                                onChange={handleToSumChange}
                            />
                        </InnerBlock>
                    </ContentWrapper>
                </Container>
            </Page>
        </>
    );
};

export default App;
